<x-mail::message>
# Nuevo Mensaje de Contacto

Has recibido un nuevo mensaje desde el formulario de contacto del sitio web.

**Nombre:** {{ $data['nombre'] }}  
**Email:** [{{ $data['email'] }}](mailto:{{ $data['email'] }})  
**Teléfono:** {{ $data['telefono'] ?? 'No proporcionado' }}  

**Mensaje:**  
<x-mail::panel>
{{ $data['mensaje'] }}
</x-mail::panel>

<x-mail::button :url="'mailto:'.$data['email']">
Responder a {{ $data['nombre'] }}
</x-mail::button>

Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
