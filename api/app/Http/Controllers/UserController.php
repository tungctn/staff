<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Member;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $check = false;
        if (Auth::check()) {
            $check = true;
        }
        // $admin = Member::where('role', '=', 'admin')->get()->toArray();
        $member = Member::where('role', '=', 'member')->get()->toArray();
        // $members = array_merge($admin, $member);
        return response()->json([
            'success' => 'true',
            'member' => $member,
            'login' => $check,
            'auth' => auth()->check()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        $newUser->name = $request->input('name');
        $newUser->email = $request->input('email');
        $newUser->password = Hash::make($request->input('name'));
        $newUser->role = $request->input('role');
        $newUser->save();

        $newMember = new Member;
        $newMember->name = $request->input('name');
        $newMember->email = $request->input('email');
        $newMember->phone = $request->input('phone');
        $newMember->address = $request->input('address');
        $newMember->role = $request->input('role');
        $newMember->save();

        return response()->json([
            'success' => 'true',
            'message' => 'Create new user successfully',
            'user' => $newUser,
            'member' => $newMember,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Member::where('id', '=', $id)->get()->toArray();
        if (!count($user)) {
            return response()->json([
                'success' => 'false',
                'message' => 'Not member',
            ]);
        }
        return response()->json([
            'success' => 'true',
            'member' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $member = DB::table('members')->where('id', $id)->get();
        $user = DB::table('users')->where('id', $id)->get();
        // $image_path = "https://hihisex.biz/wp-content/uploads/2022/07/nu-phat-thanh-vien-dam-duc-len-lut-dit-nhau-cung-anh-quay-phim-e1659111772297-400x300.jpg";

        if (count($user) === 0) {
            return response()->json([
                'success' => 'false',
                'message' => 'user not found'
            ]);
        }

        $email = DB::table('members')->where('email', $request->email)->where('id', '!=', $id)->get();
        if (count($email)) {
            return response()->json([
                'success' => 'false',
                'message' => 'email exist'
            ]);
        }

        // if ($request->hasFile('image')) {
        // $path = $request->file('image')->store('public/restaurants');
        // $image_path = env('APP_URL') . ':8000/' . 'storage/' . substr($path, strlen('public/'));
        // $image_path = "http://localhost:8000/storage/restaurants/4O6PoZfJlcnz2LRJGFa2wyBk4AMYYI0k6OvVbXoZ.jpg";
        // } 
        // return response()->json(['message' => 'good', 'link' => $image_path]);
        // } else {
        //     return response()->json(['message' => 'bad']);
        // }

        DB::table('members')
            ->where('id', $id)
            ->update(['email' => $request->email, 'name' => $request->name, 'phone' => $request->phone, 'address' => $request->address, 'role' => $request->role]);
        DB::table('users')
            ->where('id', $id)
            ->update(['email' => $request->email, 'name' => $request->name, 'role' => $request->role]);
        $member = DB::table('members')->where('id', $id)->get();
        return response()->json([
            'success' => 'true',
            'message' => 'update successfully',
            'member' => $member,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = DB::table('members')->where('id', $id)->get();

        if (count($user) === 0) {
            return response()->json([
                'success' => 'false',
                'message' => 'user not found'
            ]);
        }

        DB::table('users')->where('id', $id)->delete();
        DB::table('members')->where('id', $id)->delete();
        return response()->json([
            'success' => 'true',
            'message' => 'delete successfully'
        ]);
    }

    public function emailUnique($email)
    {
        $user = User::where('email', "=", $email)->get();
        if (count($user)) {
            return response()->json([
                'success' => 'false',
                'message' => 'Email exits',
            ]);
        }
    }

    public function phoneUnique($phone)
    {
        $user = Member::where('phone', "=", $phone)->get();
        if (count($user)) {
            return response()->json([
                'success' => 'false',
                'message' => 'Phone exits',
            ]);
        }
    }

    public function upload(Request $request, $id)
    {
        $member = DB::table('members')->where('id', $id)->get();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/restaurants');
            $image_path = env('APP_URL') . ':8000/' . 'storage/' . substr($path, strlen('public/'));
            DB::table('members')
                ->where('id', $id)
                ->update(['image' => $image_path]);

            return response()->json(['message' => 'good', 'link' => $image_path]);
        } else {
            return response()->json(['message' => 'bad']);
        }
    }
}
