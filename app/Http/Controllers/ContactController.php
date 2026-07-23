<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'mensaje' => 'required|string|max:2000',
        ]);

        try {
            Mail::to('jorgitochoque007@gmail.com')->send(new ContactMessage($validated));
            
            return back()->with('success', 'Mensaje enviado correctamente.');
        } catch (\Exception $e) {
            Log::error('Error enviando mensaje de contacto: ' . $e->getMessage());
            
            return back()->withErrors(['email' => 'Hubo un error al enviar el mensaje. Por favor intente nuevamente.']);
        }
    }
}
