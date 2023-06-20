<?php

namespace App\Http\Controllers\Api;

use App\Models\Berita;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\BeritaResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BeritaController extends Controller
{
    public function index()
    {
        $news = Berita::all();
        return new BeritaResource(true, 'List Berita', $news);
    }

    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'image'     => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title'     => 'required',
            'penulis'     => 'required',
            'content'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/posts', $image->hashName());

        //create post
        $news = Berita::create([
            'image'     => $image->hashName(),
            'title'     => $request->title,
            'content'   => $request->content,
            'penulis'   => $request->penulis,
        ]);

        //return response
        return new BeritaResource(true, 'Data Berhasil Ditambahkan!', $news);
    }

    public function show(Berita $news)
    {
        return new BeritaResource(true, 'Data Ditemukan', $news);
    }

    public function Update(Request $request, Berita $news)
    {
        $validator = Validator::make($request->all(), [
            'title'     => 'required',
            'content'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //check if image is not empty
        if ($request->hasFile('image')) {

            $image = $request->file('image');
            $image->storeAs('public/posts', $image->hashName());

            Storage::delete('storage/app/public/posts/'.$news->image);

            $news->update([
                'image'     => $image->hashName(),
                'title'     => $request->title,
                'content'   => $request->content,
            ]);

        } else {
            $news->update([
                'title'     => $request->title,
                'content'   => $request->content,
            ]);
        }

        return new BeritaResource(true, 'Data Berhasil Diubah!', $news);
    }

    public function destroy(Berita $news)
    {
        //delete image
        Storage::delete('storage/app/public/posts/'.$news->image);

        //delete post
        $news->delete();

        //return response
        return new BeritaResource(true, 'Data Berhasil Dihapus!', null);
    }
}
