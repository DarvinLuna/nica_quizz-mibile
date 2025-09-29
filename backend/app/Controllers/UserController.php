<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class UserController extends BaseController
{
    public function index()
    {
        return view('usuarios');
    }

    /**
     * Devuelve TODOS los usuarios en un JSON simple para DataTables (client-side).
     * GET /users/list
     */
    public function list()
    {
        $users = new UserModel();

        // Selecciona solo campos visibles (no password_hash)
        $rows = $users->select([
                'id','role_id','display_name','email','username',
                'status','grade','locale','last_login_at','created_at','updated_at'
            ])
            ->orderBy('id','DESC')
            ->findAll();  // <- lo más simple

        // DataTables en modo cliente solo requiere { data: [...] }
        return $this->response->setJSON(['data' => $rows]);
    }

    /** GET /users/{id} */
    public function show($id)
    {
        $users = new UserModel();
        $u = $users->find((int)$id);
        if (!$u) return $this->response->setStatusCode(404)->setJSON(['ok'=>false, 'error'=>'No encontrado']);
        unset($u['password_hash']);
        return $this->response->setJSON(['ok'=>true, 'data'=>$u]);
    }

    /** POST /users  (crear) JSON: {role_id, display_name, email?, username?, password?, grade?, ...} */
    public function store()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        $users = new UserModel();

        // Validación básica de identidad
        $email    = trim((string)($data['email'] ?? ''));
        $username = trim((string)($data['username'] ?? ''));
        $password = (string)($data['password'] ?? '');

        if ($email && $users->emailExists($email)) {
            return $this->response->setStatusCode(409)->setJSON(['ok'=>false,'error'=>'Email ya registrado']);
        }
        if ($username && $users->usernameExists($username)) {
            return $this->response->setStatusCode(409)->setJSON(['ok'=>false,'error'=>'Username ya registrado']);
        }
        if (!$email && !$username) {
            return $this->response->setStatusCode(422)->setJSON(['ok'=>false,'error'=>'Debe proporcionar email o username']);
        }

        // Password opcional si será SSO-only (password_hash NULL)
        $hash = $password !== '' ? password_hash($password, PASSWORD_DEFAULT) : null;

        $payload = [
            'role_id'      => (int)($data['role_id'] ?? 4), // por defecto student
            'username'     => $username ?: null,
            'email'        => $email ?: null,
            'password_hash'=> $hash, // puede ser NULL para SSO
            'status'       => $data['status'] ?? 'active',
            'display_name' => trim((string)($data['display_name'] ?? '')),
            'date_of_birth'=> $data['date_of_birth'] ?? null,
            'grade'        => $data['grade'] ?? null,
            'locale'       => $data['locale'] ?? 'es-NI',
            'guardian_id'  => $data['guardian_id'] ?? null,
        ];

        if (!$users->validate($payload)) {
            return $this->response->setStatusCode(422)->setJSON(['ok'=>false,'error'=>$users->errors()]);
        }

        $id = $users->insert($payload, true);
        $u  = $users->find($id);
        unset($u['password_hash']);
        return $this->response->setStatusCode(201)->setJSON(['ok'=>true,'data'=>$u]);
    }

    /** PUT/PATCH /users/{id}  (actualizar) */
    public function update($id)
    {
        $id = (int)$id;
        $users = new UserModel();
        $u = $users->find($id);
        if (!$u) return $this->response->setStatusCode(404)->setJSON(['ok'=>false,'error'=>'No encontrado']);

        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();

        // Unicidad condicional
        if (isset($data['email'])) {
            $email = trim((string)$data['email']);
            if ($email !== '' && $users->emailExists($email, $id)) {
                return $this->response->setStatusCode(409)->setJSON(['ok'=>false,'error'=>'Email ya registrado']);
            }
        }
        if (isset($data['username'])) {
            $username = trim((string)$data['username']);
            if ($username !== '' && $users->usernameExists($username, $id)) {
                return $this->response->setStatusCode(409)->setJSON(['ok'=>false,'error'=>'Username ya registrado']);
            }
        }

        // Si envía "password", recalculamos hash; si envía cadena vacía, ignoramos
        if (array_key_exists('password', $data)) {
            $pwd = (string)$data['password'];
            if ($pwd !== '') {
                $data['password_hash'] = password_hash($pwd, PASSWORD_DEFAULT);
            }
            unset($data['password']);
        }

        // Sanitizar: jamás permitir setear last_login_at manualmente aquí
        unset($data['last_login_at'], $data['created_at'], $data['updated_at'], $data['id']);

        // Validar contra reglas del modelo (solo campos permitidos)
        $payload = array_intersect_key($data, array_flip($users->allowedFields));
        if ($payload === []) {
            return $this->response->setStatusCode(400)->setJSON(['ok'=>false,'error'=>'Sin cambios']);
        }

        if (!$users->validate($payload)) {
            return $this->response->setStatusCode(422)->setJSON(['ok'=>false,'error'=>$users->errors()]);
        }

        $users->update($id, $payload);
        $u = $users->find($id);
        unset($u['password_hash']);
        return $this->response->setJSON(['ok'=>true,'data'=>$u]);
    }

    /** DELETE /users/{id}  (eliminar definitivo) */
    public function destroy($id)
    {
        $id = (int)$id;
        $users = new UserModel();
        $u = $users->find($id);
        if (!$u) return $this->response->setStatusCode(404)->setJSON(['ok'=>false,'error'=>'No encontrado']);

        // Reglas de negocio: impedir que un usuario se borre a sí mismo, o borrar admin único, etc. (opcional)
        // if ((int)session('user_id') === $id) { ... }

        $users->delete($id);
        return $this->response->setJSON(['ok'=>true,'message'=>'Eliminado']);
    }
}
