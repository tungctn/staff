<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\User;
// use App\Models\Member;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Auth;

// class AuthController extends Controller
// {
//     public function login(Request $request)
//     {
//         if (!Auth::attempt($request->only('email', 'password'))) {
//             return response()->json([
//                 'success' => 'false',
//                 'message' => 'Incorrect email or password'
//             ]);
//         }
//         $user = Auth::user();
//         // $token = $user->createToken('token')->plainTextToken;
//         $check = false;
//         if (Auth::check()) {
//             $check = true;
//         }
//         // check($check);
//         return response()->json([
//             'success' => 'true',
//             'message' => 'Login successfully',
//             'login' => $check,
//             'user' => $user
//         ]);
//     }

//     public function check($check)
//     {
//         return response()->json(['login' => $check]);
//     }

//     public function register(Request $request)
//     {
//         $user = User::where('email', $request->input('email'))->get();
//         if (count($user)) {
//             return response()->json([
//                 'success' => 'false',
//                 'message' => 'Email exits',
//             ]);
//         }

//         // create new user
//         $newUser = new User;
//         $newUser->name = $request->input('name');
//         $newUser->email = $request->input('email');
//         $newUser->password = Hash::make($request->input('password'));
//         $newUser->role = 'users';
//         $newUser->save();

//         $newMember = new Member;
//         $newMember->name = $request->input('name');
//         $newMember->email = $request->input('email');
//         $newMember->phone = (string) random_int(1, 10000000);
//         $newMember->address = '';
//         $newMember->role = 'users';
//         $newMember->save();

//         return response()->json([
//             'success' => 'true',
//             'message' => 'Create new user successfully',
//             'user' => $newUser,
//             'member' => $newMember,
//         ]);
//     }
//     // public function register(Request $request)
//     // {
//     //     $user = User::where('email', $request->input('email'))->get();
//     //     if (count($user)) {
//     //         return response()->json([
//     //             'success' => 'false',
//     //             'message' => 'Email exits',
//     //         ]);
//     //     }

//     //     // create new user
//     //     $newUser = new User;
//     //     $newUser->name = $request->input('name');
//     //     $newUser->email = $request->input('email');
//     //     $newUser->password = Hash::make($request->input('password'));
//     //     // $newUser->phone = $request->input('phone');
//     //     // $newUser->address = $request->input('address');
//     //     $newUser->role = 'users'; // default: staff
//     //     $newUser->save();

//     //     return response()->json([
//     //         'success' => 'true',
//     //         'message' => 'Create new user successfully',
//     //         'user' => $newUser
//     //     ]);
//     // }

//     public function emailUnique($email)
//     {
//         $user = User::where('email', $email)->get();
//         if (count($user)) {
//             return response()->json([
//                 'success' => 'false',
//                 'message' => 'Email exits',
//             ]);
//         }
//     }
// }

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Member;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::where('email', $request->input('email'))->get();
        if (count($user)) {
            return response()->json([
                'success' => 'false',
                'message' => 'Email exits',
            ]);
        }

        // create new user
        $newUser = new User;
        $newUser->name = $request->name;
        $newUser->email = $request->email;
        $newUser->password = Hash::make($request->password);
        $newUser->role = 'users';
        // $newUser->phone = (string) random_int(1, 1000000);
        // $newUser->address = 'Ha Noi';
        // $newUser->role = 2; // default: staff
        $newUser->save();

        $newMember = new Member;
        $newMember->name = $request->name;
        $newMember->email = $request->email;
        $newMember->phone = (string) random_int(1, 10000000);
        $newMember->address = '';
        $newMember->role = 'users';
        $newMember->save();

        return response()->json([
            'success' => 'true',
            'message' => 'Create new user successfully',
            'user' => $newUser,
            'member' => $newMember
        ]);
    }

    // public function login(Request $request)
    // {
    //     if (!Auth::attempt($request->only('email', 'password'))) {
    //         return response()->json([
    //             'success' => 'false',
    //             'message' => 'Incorrect email or password'
    //         ]);
    //     }

    //     $user = Auth::user();
    //     $token = $user->createToken('token')->plainTextToken;
    //     return response()->json([
    //         'success' => 'true',
    //         'message' => 'Login successfully',
    //         'token' => $token,
    //         'user' => $user,
    //         // 'login' => Auth::check()
    //     ]);
    // }

    public function login(Request $request)
    {

        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        $user = User::where("email", "=", $request->email)->first();

        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
                //creamos el token
                $token = $user->createToken("auth_token")->plainTextToken;
                //si está todo ok
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Usuario logueado exitosamente!",
                    "token" => $token,
                    "user" => $user
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",
                ]);
            }
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ]);
        }
    }

    public function userProfile()
    {
        $user = Member::where('email', '=', auth()->user()->email)->get();
        return response()->json([
            "status" => 0,
            "msg" => "Acerca del perfil de usuario",
            "data" => $user
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "status" => 1,
            "msg" => "Log out successful",
        ]);
    }
}
