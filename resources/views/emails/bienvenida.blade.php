<x-mail::message>
# ¡Hola {{ $user->name }}, bienvenido a Hotel Los Cedros! 🎉

Nos complace darle la más cordial bienvenida a nuestra comunidad. En **Hotel Los Cedros**, nos esforzamos por ofrecerle una experiencia inolvidable con confort, elegancia y atención de primera clase.

---

### 🌟 ¿Qué servicios tenemos para usted?

- 🛏️ **Habitaciones de Lujo:** Equipadas con la mejor comodidad, aire acondicionado y vistas espectaculares.
- 🍽️ **Restaurante & Bar:** Deliciosos platillos locales e internacionales preparados por nuestros chefs.
- 🏊 **Piscina & Áreas Verdes:** Espacios ideales para relajarse durante su estancia.
- 🤖 **Asistente Virtual 24/7 (Telegram):** Puede consultar disponibilidad, platillos y servicios en tiempo real desde nuestro bot de Telegram.
- 📶 **Wi-Fi de Alta Velocidad:** Conexión gratuita en todas las instalaciones.

---

### 🛎️ ¿Cómo funciona nuestro hotel?

1. **Reservas rápidas:** Puede explorar nuestras habitaciones y realizar sus reservas desde su panel de cliente o a través de nuestro chatbot.
2. **Check-in sencillo:** Al llegar al hotel, nuestro personal de recepción confirmará su ingreso en segundos.
3. **Atención personalizada:** Estamos disponibles las 24 horas para hacer de su estadía una experiencia placentera.

<x-mail::button :url="config('app.url')">
Ir a mi Cuenta / Explorar Hotel
</x-mail::button>

Si tiene alguna consulta, no dude en responder a este correo o contactar con nuestra recepción.

Con aprecio,<br>
**El equipo de {{ config('app.name', 'Hotel Los Cedros') }}**
</x-mail::message>
