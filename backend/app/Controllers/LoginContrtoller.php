<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\LoginModel;

class LoginContrtoller extends BaseController
{
    public function index()
    {
        return view('login');
    }

    /** POST /auth/login  Body: { "identifier": "...", "password": "..." } */
    public function login()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        $identifier = trim($data['identifier'] ?? $data['email'] ?? $data['username'] ?? '');
        $password   = (string)($data['password'] ?? '');

        if ($identifier === '' || $password === '') {
            return $this->response->setStatusCode(422)
                ->setJSON(['ok'=>false, 'error'=>'Credenciales requeridas']);
        }

        $users = new LoginModel();
        $user  = $users->findByIdentifier($identifier);

        if (! $user || empty($user['password_hash']) || ! password_verify($password, $user['password_hash'])) {
            return $this->response->setStatusCode(401)
                ->setJSON(['ok'=>false, 'error'=>'Credenciales inválidas']);
        }

        if (($user['status'] ?? 'active') !== 'active') {
            return $this->response->setStatusCode(403)
                ->setJSON(['ok'=>false, 'error'=>'Usuario inactivo o bloqueado']);
        }

        // Éxito: regenerar ID de sesión y guardar datos mínimos
        session()->regenerate();
        session()->set([
            'user_id'   => (int)$user['id'],
            'role_id'   => (int)$user['role_id'],
            'display_name' => $user['display_name'],
            'isLoggedIn'=> true,
        ]);

        // Actualizar last_login_at
        $users->update($user['id'], ['last_login_at' => date('Y-m-d H:i:s')]);

        // No exponer password_hash
        unset($user['password_hash']);

        return $this->response->setJSON(['ok'=>true, 'user'=>$user]);
    }

    /** GET /auth/me  (requiere sesión iniciada) */
    public function me()
    {
        if (! session('isLoggedIn')) {
            return $this->response->setStatusCode(401)
                ->setJSON(['ok'=>false, 'error'=>'No autorizado']);
        }

        $users = new LoginModel();
        $u = $users->find((int)session('user_id'));
        if (! $u) {
            return $this->response->setStatusCode(404)
                ->setJSON(['ok'=>false, 'error'=>'Usuario no encontrado']);
        }
        unset($u['password_hash']);

        return $this->response->setJSON(['ok'=>true, 'user'=>$u]);
    }

    /** POST /auth/logout */
    public function logout()
    {
        if (session('isLoggedIn')) {
            session()->remove(['user_id','role_id','display_name','isLoggedIn']);
            session()->regenerate(true); // invalida cookie de sesión
        }
        return $this->response->setJSON(['ok'=>true, 'message'=>'Sesión cerrada']);
    }
}
