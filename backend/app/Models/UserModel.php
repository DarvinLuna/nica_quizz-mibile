<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $allowedFields    = [
        'role_id','username','email','password_hash','status',
        'display_name','date_of_birth','grade','locale','guardian_id','last_login_at'
    ];
    protected $useTimestamps    = true; // created_at / updated_at

    protected $validationRules = [
        'role_id'      => 'required|integer',
        'display_name' => 'required|min_length[2]|max_length[120]',
        'email'        => 'permit_empty|valid_email|max_length[191]',
        'username'     => 'permit_empty|alpha_numeric_punct|min_length[3]|max_length[32]',
        'grade'        => 'permit_empty|integer|greater_than_equal_to[1]|less_than_equal_to[6]',
        'status'       => 'in_list[active,inactive,blocked]',
        'locale'       => 'permit_empty|max_length[10]',
        'guardian_id'  => 'permit_empty|integer'
    ];

    public function findByIdentifier(string $identifier): ?array
    {
        return $this->groupStart()
                        ->where('email', $identifier)
                        ->orWhere('username', $identifier)
                    ->groupEnd()
                    ->first() ?: null;
    }

    /** Verifica email único excluyendo un ID dado (para update) */
    public function emailExists(string $email, ?int $excludeId = null): bool
    {
        $b = $this->where('email', $email);
        if ($excludeId) $b->where('id !=', $excludeId);
        return (bool) $b->select('id')->first();
    }

    /** Verifica username único excluyendo un ID dado (para update) */
    public function usernameExists(string $username, ?int $excludeId = null): bool
    {
        $b = $this->where('username', $username);
        if ($excludeId) $b->where('id !=', $excludeId);
        return (bool) $b->select('id')->first();
    }
}
