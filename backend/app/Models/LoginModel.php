<?php

namespace App\Models;

use CodeIgniter\Model;

class LoginModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $allowedFields    = [
        'role_id','username','email','password_hash','status',
        'display_name','date_of_birth','grade','locale','guardian_id','last_login_at'
    ];
    protected $useTimestamps    = true; // map a created_at / updated_at

    protected $validationRules = [
        'display_name' => 'required|min_length[2]|max_length[120]',
        'email'        => 'permit_empty|valid_email|max_length[191]',
        'username'     => 'permit_empty|alpha_numeric_punct|min_length[3]|max_length[32]',
        'grade'        => 'permit_empty|integer|greater_than_equal_to[1]|less_than_equal_to[6]',
        'role_id'      => 'required|integer',
        'status'       => 'in_list[active,inactive,blocked]',
    ];

    /** Buscar por email o username (cualquiera que venga del cliente) */
    public function findByIdentifier(string $identifier): ?array
    {
        return $this->groupStart()
                        ->where('email', $identifier)
                        ->orWhere('username', $identifier)
                    ->groupEnd()
                    ->first() ?: null;
    }
}
