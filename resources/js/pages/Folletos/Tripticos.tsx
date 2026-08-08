import React, { useEffect } from "react";
import "../../../css/tripticos.css";

export default function Tripticos() {
    useEffect(() => {
        // Cargar html2pdf.js dinámicamente para que la descarga funcione en React
        if (!document.getElementById('html2pdf-script')) {
            const script = document.createElement('script');
            script.id = 'html2pdf-script';
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            document.head.appendChild(script);
        }

        // Enlazar las funciones al objeto window para HTML crudo
        (window as any).openTripticoModal = function(id: string) {
            const el = document.getElementById(id);
            if(el) {
                el.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
        };

        (window as any).closeTripticoModal = function(id: string) {
            const el = document.getElementById(id);
            if(el) {
                el.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };

        (window as any).descargarDirectamentePDF = function(tripticoId: string, nombreArchivo: string, btnElement: any) {
            const spanText = btnElement.querySelector('span');
            const loader = btnElement.querySelector('.loader');
            if(spanText && loader) {
                spanText.style.display = 'none';
                loader.style.display = 'block';
            }
            
            const element = document.getElementById(tripticoId);
            
            // @ts-ignore
            if (typeof window.html2pdf === 'undefined') {
                alert("La librería PDF aún se está cargando. Por favor, inténtalo en unos segundos.");
                if(spanText && loader) {
                    spanText.style.display = 'block';
                    loader.style.display = 'none';
                }
                return;
            }

            const opt = {
                margin:       0,
                filename:     nombreArchivo,
                image:        { type: 'jpeg', quality: 1 },
                html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' },
                pagebreak:    { mode: 'css', before: '.triptico-page' }
            };

            // @ts-ignore
            window.html2pdf().set(opt).from(element).save().then(() => {
                if(spanText && loader) {
                    spanText.style.display = 'block';
                    loader.style.display = 'none';
                }
            });
        };

        const handleOutsideClick = function(event: MouseEvent) {
            if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
                (event.target as HTMLElement).style.display = "none";
                document.body.style.overflow = "auto";
            }
        };

        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, []);

    const rawHTML = `

    <header>
        <h1>Trípticos Los Cedros</h1>
        <p style="font-size: 1.2rem; margin-top: 10px; color: #cbd5e1;">Catálogo Maestro para Impresión a Doble Cara (A4 Horizontal)</p>
    </header>

    <div class="t-container">
        <!-- Tarjeta 1 -->
        <div class="t-card">
            <h2>1. El Hotel del Futuro</h2>
            <p>Tríptico tecnológico. Destaca nuestro bot de N8N, asistentes virtuales, procesos cero papel y cómo automatizamos tu estadía.</p>
            <button class="t-btn" onclick="openTripticoModal('modal-t1')">Abrir Tríptico</button>
        </div>

        <!-- Tarjeta 2 -->
        <div class="t-card">
            <h2>2. Estancias y Habitaciones</h2>
            <p>Catálogo de lujo. Muestra la Suite Presidencial, Habitaciones Matrimoniales, Ejecutivas y los beneficios VIP.</p>
            <button class="t-btn" onclick="openTripticoModal('modal-t2')">Abrir Tríptico</button>
        </div>

        <!-- Tarjeta 3 -->
        <div class="t-card">
            <h2>3. Servicios y Gastronomía</h2>
            <p>Folleto comercial sobre el Restaurante "El Roble", Room Service, Spa, Piscina y el Salón de Eventos Gran Cedro.</p>
            <button class="t-btn" onclick="openTripticoModal('modal-t3')">Abrir Tríptico</button>
        </div>

        <!-- Tarjeta 4 (NUEVO) -->
        <div class="t-card">
            <h2>4. Guía Turística de la Ciudad</h2>
            <p>Los mejores lugares cerca del hotel, parques, museos y centros comerciales. Ideal para turistas y familias.</p>
            <button class="t-btn" onclick="openTripticoModal('modal-t4')">Abrir Tríptico</button>
        </div>

        <!-- Tarjeta 5 (NUEVO) -->
        <div class="t-card">
            <h2>5. Somos Pet-Friendly</h2>
            <p>Las normativas y comodidades para los huéspedes que viajan con sus mascotas. Camas, platos y reglas del resort.</p>
            <button class="t-btn" onclick="openTripticoModal('modal-t5')">Abrir Tríptico</button>
        </div>
    </div>


    <!-- ==============================================
         MODALES Y CONTENIDO DE LOS TRÍPTICOS
         ============================================== -->

    <!-- TRÍPTICO 1: TECNOLOGÍA N8N -->
    <div class="modal-overlay" id="modal-t1">
        <div class="modal-content">
            <button class="close-btn" onclick="closeTripticoModal('modal-t1')">&times;</button>
            <button class="download-btn" onclick="descargarDirectamentePDF('triptico-1', '1_HotelDelFuturo_N8N.pdf', this)">
                <span>📥 Descargar Archivo PDF Directamente</span>
                <div class="loader"></div>
            </button>
            
            <div class="triptico-container" id="triptico-1">
                <!-- CARA EXTERNA (Anverso) -->
                <!-- Al doblar un tríptico: Panel Izquierdo es la solapa interna, Medio es Contraportada, Derecho es Portada -->
                <div class="triptico-page">
                    <!-- Solapa Interna -->
                    <div class="panel">
                        <h2 class="p-title">Cero Papel 🍃</h2>
                        <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Gracias a nuestra arquitectura en la nube (Railway) y automatización, el <b>95%</b> de nuestros procesos administrativos no requieren papel.</p>
                        <div class="p-footer" style="background:#e8f5e9; color:#2e7d32; border-left:4px solid #2e7d32;">
                            Facturas y Recibos directo a tu email al momento del Check-out.
                        </div>
                    </div>
                    <!-- Contraportada -->
                    <div class="panel bg-dark">
                        <h2 class="p-title-gold">Contáctanos</h2>
                        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">📍 Av. Principal #123<br>📞 +591 777-12345<br>✉️ reservas@loscedros.com</p>
                        <p class="p-text" style="text-align:center; font-size:1.5rem; margin-top:20px; color:var(--secondary);"><b>@LosCedrosBot</b></p>
                        <div class="p-footer" style="border: 2px solid var(--secondary);">www.hotelloscedros.com</div>
                    </div>
                    <!-- Portada Principal -->
                    <div class="panel" style="background: linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.9)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80') center/cover;">
                        <div style="text-align:center; margin-top: 50px;">
                            <h1 style="font-family:'Playfair Display'; color:var(--secondary); font-size: 4rem; margin:0;">Los Cedros</h1>
                            <p style="color:white; font-size: 1.5rem; letter-spacing: 3px;">HOTEL & RESORT</p>
                            <div style="width: 50px; height: 3px; background:var(--secondary); margin: 30px auto;"></div>
                            <h2 style="color:white; font-size: 2.5rem; font-weight: 300;">El Hotel del Futuro</h2>
                            <p style="color:#ddd; font-size: 1.2rem; margin-top: 50px; line-height: 2;">Impulsado por<br><b>Inteligencia Artificial y N8N</b></p>
                        </div>
                    </div>
                </div>

                <!-- CARA INTERNA (Reverso) -->
                <div class="triptico-page">
                    <!-- Interior Izquierdo -->
                    <div class="panel">
                        <h2 class="p-title">Tu Asistente 24/7</h2>
                        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Hemos revolucionado la hospitalidad. Olvídate de llamar a recepción.</p>
                        <p class="p-text">Abre <b>Telegram</b> y busca a <b>@LosCedrosBot</b>. Nuestro asistente inteligente está conectado a la base de datos.</p>
                    </div>
                    <!-- Interior Medio -->
                    <div class="panel" style="background: #f8fafc;">
                        <h2 class="p-title" style="font-size: 2rem;">¿Qué puedes pedir?</h2>
                        <ul class="p-text" style="line-height: 2.5; margin-top:30px;">
                            <li>🛎️ <i>"Hazme el check-in"</i></li>
                            <li>🍔 <i>"Manda una hamburguesa a la 102"</i></li>
                            <li>🧼 <i>"Necesito toallas limpias"</i></li>
                            <li>🚕 <i>"Pídeme un taxi para mañana"</i></li>
                        </ul>
                        <div class="p-footer" style="background: var(--primary); color: var(--secondary);">
                            Todo ejecutado en milisegundos gracias a la potencia de N8N.
                        </div>
                    </div>
                    <!-- Interior Derecho -->
                    <div class="panel">
                        <h2 class="p-title">Room Service IA</h2>
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80" class="p-img-tall">
                        <p class="p-text" style="text-align:center;">Tus pedidos escritos en el móvil aparecen instantáneamente en las pantallas de nuestra cocina y personal de limpieza.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- TRÍPTICO 2: HABITACIONES -->
    <div class="modal-overlay" id="modal-t2">
        <div class="modal-content">
            <button class="close-btn" onclick="closeTripticoModal('modal-t2')">&times;</button>
            <button class="download-btn" onclick="descargarDirectamentePDF('triptico-2', '2_Habitaciones_VIP.pdf', this)">
                <span>📥 Descargar Archivo PDF Directamente</span>
                <div class="loader"></div>
            </button>
            
            <div class="triptico-container" id="triptico-2">
                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Membresía VIP ⭐</h2>
                        <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Hazte miembro y disfruta:</p>
                        <ul class="p-text" style="line-height: 2;">
                            <li>15% Descuento en reservas.</li>
                            <li>Late Check-out gratuito.</li>
                            <li>Prioridad en atención bot.</li>
                        </ul>
                    </div>
                    <div class="panel bg-dark">
                        <h2 class="p-title-gold">Ubicación</h2>
                        <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">A pasos del centro financiero y las mejores atracciones de la ciudad.</p>
                        <p class="p-text" style="margin-top:40px;"><b>Reservas Online:</b><br>www.hotelloscedros.com</p>
                    </div>
                    <div class="panel" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80') center/cover;">
                        <div style="text-align:center; margin-top: 80px;">
                            <h1 style="font-family:'Playfair Display'; color:white; font-size: 3.5rem; margin:0;">Estancias de Lujo</h1>
                            <div style="width: 50px; height: 3px; background:var(--secondary); margin: 30px auto;"></div>
                            <p style="color:#ddd; font-size: 1.5rem; line-height: 1.8;">El confort perfecto para<br>negocios y placer.</p>
                        </div>
                    </div>
                </div>

                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Suite Presidencial</h2>
                        <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80" class="p-img-tall">
                        <p class="p-text">Nuestra joya. Jacuzzi privado, vistas panorámicas y control domótico por voz en toda la habitación.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Hab. Matrimonial</h2>
                        <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Espacio romántico y acogedor con cama Queen Size, minibar premium y balcón privado al jardín.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Hab. Ejecutiva</h2>
                        <img src="https://images.unsplash.com/photo-1582719478250-c89af14fbbee?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Diseñada para nómadas digitales. Escritorio ergonómico y fibra óptica de alta velocidad.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- TRÍPTICO 3: SERVICIOS -->
    <div class="modal-overlay" id="modal-t3">
        <div class="modal-content">
            <button class="close-btn" onclick="closeTripticoModal('modal-t3')">&times;</button>
            <button class="download-btn" onclick="descargarDirectamentePDF('triptico-3', '3_Servicios_Spa.pdf', this)">
                <span>📥 Descargar Archivo PDF Directamente</span>
                <div class="loader"></div>
            </button>
            
            <div class="triptico-container" id="triptico-3">
                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Transporte 🚕</h2>
                        <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Ofrecemos servicio de Shuttle directo al aeropuerto y taxis VIP en la entrada principal las 24 hrs.</p>
                    </div>
                    <div class="panel bg-dark">
                        <h2 class="p-title-gold">Los Cedros</h2>
                        <p class="p-text" style="text-align:center; margin-top:50px; font-size: 1.5rem;">Descubre todo lo que tenemos para ofrecerte sin salir del hotel.</p>
                        <div class="p-footer" style="border: 2px solid var(--secondary); margin-top:auto;">Experiencia All-Inclusive</div>
                    </div>
                    <div class="panel" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80') center/cover;">
                        <div style="text-align:center; margin-top: 100px;">
                            <h1 style="font-family:'Playfair Display'; color:white; font-size: 3.5rem; margin:0;">Servicios Premium</h1>
                            <div style="width: 50px; height: 3px; background:var(--secondary); margin: 30px auto;"></div>
                            <p style="color:white; font-size: 1.5rem; font-weight: bold;">Gastronomía, Spa & Bodas</p>
                        </div>
                    </div>
                </div>

                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Restaurante</h2>
                        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text"><b>El Roble</b>: Disfruta de gastronomía internacional y local de alta gama. Pide desayuno a la habitación usando nuestro chatbot.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Spa & Wellness</h2>
                        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Relaja tu mente y cuerpo. Contamos con piscinas climatizadas, sauna seco, masajes con piedras y terapias florales.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Eventos & Bodas</h2>
                        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">El imponente <b>Salón Gran Cedro</b> con capacidad para 300 personas. Equipado con proyectores 4K y servicio de catering de lujo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- TRÍPTICO 4: GUÍA TURÍSTICA -->
    <div class="modal-overlay" id="modal-t4">
        <div class="modal-content">
            <button class="close-btn" onclick="closeTripticoModal('modal-t4')">&times;</button>
            <button class="download-btn" onclick="descargarDirectamentePDF('triptico-4', '4_Guia_Turistica.pdf', this)">
                <span>📥 Descargar Archivo PDF Directamente</span>
                <div class="loader"></div>
            </button>
            
            <div class="triptico-container" id="triptico-4">
                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Vida Nocturna 🍷</h2>
                        <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Bares de coctelería de autor y teatro nacional a solo 10 minutos de distancia en taxi seguro.</p>
                    </div>
                    <div class="panel bg-dark">
                        <h2 class="p-title-gold">Turismo VIP</h2>
                        <p class="p-text" style="text-align:center; margin-top:50px; font-size: 1.5rem;">Solicita mapas interactivos en tu teléfono mediante nuestro Asistente de Telegram.</p>
                        <div class="p-footer" style="border: 2px solid var(--secondary); margin-top:auto;">Pregunta por nuestros City Tours</div>
                    </div>
                    <div class="panel" style="background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=400&q=80') center/cover;">
                        <div style="text-align:center; margin-top: 100px;">
                            <h1 style="font-family:'Playfair Display'; color:white; font-size: 3.5rem; margin:0;">Guía Turística</h1>
                            <div style="width: 50px; height: 3px; background:var(--secondary); margin: 30px auto;"></div>
                            <p style="color:white; font-size: 1.5rem; font-weight: bold;">Descubre la ciudad con nosotros.</p>
                        </div>
                    </div>
                </div>

                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Centro Histórico</h2>
                        <img src="https://images.unsplash.com/photo-1520630722304-45e05be3b0be?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Visita la plaza principal, la catedral y los museos más icónicos de la zona, a tan solo 5 cuadras del hotel.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Naturaleza</h2>
                        <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Parques botánicos y reservas naturales ideales para trotar por la mañana o pasar una tarde en familia respirando aire puro.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Shopping Center</h2>
                        <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">El Mall más grande de la región. Boutiques internacionales, cines y áreas de juego a poca distancia.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- TRÍPTICO 5: PET FRIENDLY -->
    <div class="modal-overlay" id="modal-t5">
        <div class="modal-content">
            <button class="close-btn" onclick="closeTripticoModal('modal-t5')">&times;</button>
            <button class="download-btn" onclick="descargarDirectamentePDF('triptico-5', '5_PetFriendly.pdf', this)">
                <span>📥 Descargar Archivo PDF Directamente</span>
                <div class="loader"></div>
            </button>
            
            <div class="triptico-container" id="triptico-5">
                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Veterinario 24/7 🩺</h2>
                        <img src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Contamos con alianza médica veterinaria. En caso de emergencia, envia un chat al bot de N8N y un doctor acudirá al hotel.</p>
                    </div>
                    <div class="panel bg-dark">
                        <h2 class="p-title-gold">Reglamento</h2>
                        <ul class="p-text" style="line-height:2.5; margin-top:30px;">
                            <li>✅ Máximo 2 mascotas por suite.</li>
                            <li>✅ Uso obligatorio de correa.</li>
                            <li>❌ Prohibido mascotas en el Spa.</li>
                        </ul>
                        <div class="p-footer" style="border: 2px solid var(--secondary); margin-top:auto;">Cuidamos a los que amas</div>
                    </div>
                    <div class="panel" style="background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80') center/cover;">
                        <div style="text-align:center; margin-top: 100px;">
                            <h1 style="font-family:'Playfair Display'; color:white; font-size: 3.5rem; margin:0;">Pet Friendly</h1>
                            <div style="width: 50px; height: 3px; background:var(--secondary); margin: 30px auto;"></div>
                            <p style="color:white; font-size: 1.5rem; font-weight: bold;">Tus mejores amigos<br>son bienvenidos.</p>
                        </div>
                    </div>
                </div>

                <div class="triptico-page">
                    <div class="panel">
                        <h2 class="p-title">Camas Exclusivas</h2>
                        <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80" class="p-img-tall">
                        <p class="p-text">Incluimos en tu habitación una cama ortopédica para tu perro o gato, asegurando que ellos también tengan un descanso de lujo.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Jardín Privado</h2>
                        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Contamos con una amplia zona verde en la parte posterior del hotel para que tu mascota pueda correr y jugar al aire libre.</p>
                    </div>
                    <div class="panel">
                        <h2 class="p-title">Alimentos Premium</h2>
                        <img src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80" class="p-img">
                        <p class="p-text">Room Service para mascotas. Solicita mediante el bot platos balanceados y premios gourmet preparados por nuestros chefs.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    `;

    return (
        <div className="tripticos-section" style={{ minHeight: '100vh', paddingBottom: '5rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
            <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
        </div>
    );
}