import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import "../../../css/folletos.css";

export default function Folletos() {
    useEffect(() => {
        // Enlazar las funciones al objeto window para que el HTML crudo pueda ejecutarlas
        (window as any).openModal = function(id: string) {
            const el = document.getElementById(id);
            if(el) {
                el.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
        };

        (window as any).closeModal = function(id: string) {
            const el = document.getElementById(id);
            if(el) {
                el.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };

        (window as any).downloadPDF = function(brochureId: string, filename: string) {
            const element = document.getElementById(brochureId);
            if(!element) return;
            const parent = element.parentNode;
            
            const bodyChildren = document.body.children;
            const originalStyles: any[] = [];
            for (let i = 0; i < bodyChildren.length; i++) {
                if (bodyChildren[i].tagName !== "SCRIPT" && bodyChildren[i].tagName !== "STYLE") {
                    originalStyles.push({ el: bodyChildren[i] as HTMLElement, display: (bodyChildren[i] as HTMLElement).style.display });
                    (bodyChildren[i] as HTMLElement).style.display = "none";
                }
            }

            document.body.appendChild(element);
            
            setTimeout(() => {
                alert("Para guardar el PDF perfecto, asegúrate de seleccionar 'Guardar como PDF' en la ventana que se abrirá.");
                window.print();
                
                parent?.appendChild(element);
                for (let i = 0; i < originalStyles.length; i++) {
                    originalStyles[i].el.style.display = originalStyles[i].display;
                }
            }, 500);
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

    const rawHTML = `<header>
        <h1>Hotel Los Cedros</h1>
        <p>Centro de Materiales y Folletos Digitales Profesionales (17 Diseños Completos)</p>
    </header>

    <h2 class="section-title">🌟 Folletos para el Huésped</h2>
    <div class="f-container">
        <div class="f-card">
            <h3>1. Descubre Los Cedros</h3>
            <p>Tríptico informativo general con historia, misión y descripción del hotel.</p>
            <button class="f-btn" onclick="openModal('modal-1')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>2. Catálogo de Habitaciones</h3>
            <p>Folleto visual con detalles de nuestras Suites, Habitaciones Matrimoniales y Simples.</p>
            <button class="f-btn" onclick="openModal('modal-3')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>3. Programa de Membresías</h3>
            <p>Beneficios de ser cliente VIP (descuentos, late check-out).</p>
            <button class="f-btn" onclick="openModal('modal-4')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>4. Servicios Premium</h3>
            <p>Información sobre Spa, Piscinas y áreas de relajación.</p>
            <button class="f-btn" onclick="openModal('modal-5')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>5. Menú del Restaurante</h3>
            <p>Gastronomía de primer nivel. Room service mediante N8N.</p>
            <button class="f-btn" onclick="openModal('modal-8')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>6. Eventos y Corporativo</h3>
            <p>Salones de conferencias, bodas y reuniones ejecutivas.</p>
            <button class="f-btn" onclick="openModal('modal-6')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>7. Guía Turística Local</h3>
            <p>Lugares turísticos cerca del hotel y atracciones recomendadas.</p>
            <button class="f-btn" onclick="openModal('modal-9')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>8. Somos Pet-Friendly</h3>
            <p>Normas y comodidades para los huéspedes que viajan con mascotas.</p>
            <button class="f-btn" onclick="openModal('modal-10')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>9. Transporte y Traslados</h3>
            <p>Servicio de Shuttle al aeropuerto y tarifas de taxis seguros.</p>
            <button class="f-btn" onclick="openModal('modal-11')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>10. Promociones de Temporada</h3>
            <p>Ofertas especiales de San Valentín, Invierno y Fin de Año.</p>
            <button class="f-btn" onclick="openModal('modal-12')">Ver y Descargar</button>
        </div>
    </div>

    <h2 class="section-title">🤖 Folletos Tecnológicos y de N8N</h2>
    <div class="f-container">
        <div class="f-card">
            <h3>11. Innovación IA (N8N)</h3>
            <p>Folleto general sobre nuestro asistente virtual 24/7 impulsado por Groq.</p>
            <button class="f-btn" onclick="openModal('modal-2')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>12. Manual del Usuario IA</h3>
            <p>Tríptico enseñando al cliente paso a paso cómo usar el bot en Telegram.</p>
            <button class="f-btn" onclick="openModal('modal-13')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>13. Guía Rápida del Huésped</h3>
            <p>Horarios de check-in y contacto automatizado para asistencia.</p>
            <button class="f-btn" onclick="openModal('modal-7')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>14. El Hotel del Futuro (B2B)</h3>
            <p>Folleto para inversores explicando cómo N8N ahorra horas de gestión administrativa.</p>
            <button class="f-btn" onclick="openModal('modal-14')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>15. Seguridad y Privacidad</h3>
            <p>Garantía de protección de datos en nuestras bases de datos e IA.</p>
            <button class="f-btn" onclick="openModal('modal-15')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>16. Automatización de Staff</h3>
            <p>Manual interno para Recepcionistas sobre cómo leer reportes automáticos.</p>
            <button class="f-btn" onclick="openModal('modal-16')">Ver y Descargar</button>
        </div>
        <div class="f-card">
            <h3>17. Sostenibilidad Cero Papel</h3>
            <p>Impacto ecológico positivo gracias a reservas web y reportes PDF vía N8N.</p>
            <button class="f-btn" onclick="openModal('modal-17')">Ver y Descargar</button>
        </div>
        <!-- Card 18 -->
        <div class="f-card" style="border: 2px solid var(--secondary); background: rgba(212, 175, 55, 0.1);">
            <h3>18. Manual Técnico General (18 Páginas)</h3>
            <p>Dossier completo del software: Laravel, Modelos, Autenticación, Roles y N8N.</p>
            <button class="f-btn" onclick="openModal('modal-18')">Ver y Descargar Documento Completo</button>
        </div>
    </div>


    <!-- ==========================================
         MODALS & BROCHURES CONTENT 
         ========================================== -->

    <!-- Modal 1: Descubre Los Cedros -->
    <div class="modal-overlay" id="modal-1">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-1')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-1', '1_Informativo_LosCedros.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure triptico" id="brochure-1">
                <div class="triptico-panel">
                    <h2 style="color:var(--primary); font-family:'Playfair Display'; font-size: 2.2rem;">Bienvenidos</h2>
                    <img src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?auto=format&fit=crop&w=400&q=80" class="triptico-image" alt="Hotel exterior">
                    <p class="b-text">Ubicados en el corazón de la ciudad, el <b>Hotel Los Cedros</b> es un oasis de tranquilidad y elegancia.</p>
                    <div style="background:#eee; padding:15px; margin-top:auto; border-radius:8px;"><i>"El mejor descanso, rodeado de lujo."</i></div>
                </div>
                <div class="triptico-panel">
                    <h2 style="color:var(--primary); font-family:'Playfair Display'; font-size: 2.2rem;">Servicios</h2>
                    <ul class="b-text" style="line-height:2.5; margin-bottom: 30px;">
                        <li>🛎️ Recepción 24/7</li>
                        <li>🤖 Asistente Virtual N8N</li>
                        <li>🍽️ Restaurante Gourmet</li>
                        <li>💆 Spa y Relajación</li>
                        <li>📶 WiFi de Alta Velocidad</li>
                    </ul>
                    <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80" class="triptico-image" alt="Servicios" style="margin-top:auto;">
                </div>
                <div class="triptico-panel">
                    <h2 style="font-size: 2.5rem;">Hotel Los Cedros</h2>
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" class="triptico-image" alt="Lobby">
                    <p style="font-size:1.3rem; line-height:2; margin-top:20px;">📍 Av. Principal #123<br>📞 +591 777-12345<br>✉️ reservas@loscedros.com</p>
                    <div style="margin-top:auto; padding:20px; border:2px solid var(--secondary); text-align:center; font-size: 1.5rem;"><b>¡Reserva hoy mismo!</b></div>
                </div>
            </div></div>
        </div>
    </div>

    <!-- Modal 2: Innovación IA -->
    <div class="modal-overlay" id="modal-2">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-2')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-2', '2_N8N_Asistente.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-2">
                <div class="b-header"><h1>Innovación a tu Servicio</h1><p style="font-size:1.8rem; margin-top:10px;">Tu Asistente Virtual 24/7</p></div>
                <div class="b-content">
                    <h2 class="b-title">Tecnología N8N + IA Groq</h2>
                    <p class="b-text">Hemos revolucionado la atención al huésped con automatizaciones en tiempo real conectadas a nuestra base de datos. Sin esperas, sin complicaciones.</p>
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Technology">
                    <div class="b-grid" style="margin-top:auto;">
                        <div class="b-box">
                            <h3 style="color:var(--primary); font-size: 1.5rem;">📱 Telegram Bot</h3>
                            <p>Reserva habitaciones y consulta servicios directamente desde tu app de mensajería con @LosCedrosBot.</p>
                        </div>
                        <div class="b-box">
                            <h3 style="color:var(--primary); font-size: 1.5rem;">💻 Chat Web</h3>
                            <p>Soporte en tiempo real en nuestra plataforma web segura para usuarios registrados y administradores.</p>
                        </div>
                    </div>
                </div>
                <div class="b-footer">Innovación Tecnológica - Hotel Los Cedros</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 3: Habitaciones -->
    <div class="modal-overlay" id="modal-3">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-3')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-3', '3_Habitaciones.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-3">
                <div class="b-header" style="background:#2c3e50;"><h1 style="color:#ecf0f1;">Catálogo de Estancias</h1></div>
                <div class="b-content">
                    <div style="border-left:5px solid var(--secondary); padding-left:20px; margin-bottom:20px;">
                        <h2 style="font-family:'Playfair Display'; font-size:2.2rem; margin:0;">1. Suite Presidencial</h2>
                        <p class="b-text" style="margin: 5px 0;">La habitación más exclusiva con jacuzzi privado y vistas panorámicas.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" style="width:100%; height:200px; object-fit:cover; border-radius:10px; margin-bottom: 20px;">
                    
                    <div style="border-left:5px solid var(--primary); padding-left:20px; margin-bottom:20px;">
                        <h2 style="font-family:'Playfair Display'; font-size:2.2rem; margin:0;">2. Habitación Matrimonial</h2>
                        <p class="b-text" style="margin: 5px 0;">Espaciosa y romántica. Cama Queen, minibar y balcón privado.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80" style="width:100%; height:200px; object-fit:cover; border-radius:10px; margin-bottom: 20px;">
                    
                    <div style="border-left:5px solid #7f8c8d; padding-left:20px;">
                        <h2 style="font-family:'Playfair Display'; font-size:2.2rem; margin:0;">3. Habitación Ejecutiva</h2>
                        <p class="b-text" style="margin: 5px 0;">Diseñada para negocios. Escritorio ergonómico y fibra óptica.</p>
                    </div>
                </div>
                <div class="b-footer" style="background:#2c3e50;">Reserva tu lugar especial</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 4: Membresías -->
    <div class="modal-overlay" id="modal-4">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-4')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-4', '4_Membresias.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-4">
                <div class="b-header" style="background:linear-gradient(45deg, var(--secondary), #f1c40f); color:var(--primary);"><h1>Membresías VIP</h1><p style="font-size:1.6rem; font-weight:bold;">Beneficios por tu lealtad</p></div>
                <div class="b-content">
                    <p class="b-text" style="text-align:center; font-size:1.5rem;">Al ser cliente recurrente del Hotel Los Cedros, accedes a beneficios que harán tu estadía inolvidable.</p>
                    <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="VIP Lifestyle">
                    
                    <div class="b-grid" style="margin-top:auto;">
                        <div style="background:var(--primary); color:white; padding:30px; border-radius:12px; text-align:center;">
                            <h2 style="font-size: 2rem;">Cliente Regular</h2>
                            <ul style="line-height:2.5; font-size:1.2rem; list-style:none; padding:0; text-align: left;">
                                <li>✅ Reservas web instantáneas</li>
                                <li>✅ Atención IA 24/7</li>
                                <li>✅ Desayuno Continental</li>
                            </ul>
                        </div>
                        <div style="background:linear-gradient(135deg, #ffd700, #daa520); color:#333; padding:30px; border-radius:12px; text-align:center; box-shadow: 0 10px 25px rgba(218, 165, 32, 0.4);">
                            <h2 style="font-size: 2rem;">Cliente VIP</h2>
                            <ul style="line-height:2.5; font-size:1.2rem; list-style:none; padding:0; text-align: left;">
                                <li>⭐ <b>15% Off</b> en Spa & Masajes</li>
                                <li>⭐ Late Check-out sin costo</li>
                                <li>⭐ Prioridad N8N Alta</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="b-footer" style="background:#222;">Familia Los Cedros</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 5: Servicios -->
    <div class="modal-overlay" id="modal-5">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-5')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-5', '5_Servicios.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-5">
                <div class="b-header" style="background:#27ae60;"><h1 style="color:white;">Servicios Premium</h1></div>
                <div class="b-content">
                    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" style="width:100%; height:250px; object-fit:cover; border-radius:10px; margin-bottom: 20px;" alt="Spa">
                    <div style="margin-bottom:30px; background:#f9f9f9; padding: 20px; border-radius: 8px; border-left: 5px solid #27ae60;">
                        <h3 style="color:#27ae60; font-size:1.8rem; margin:0;">💆 Spa & Wellness</h3>
                        <p class="b-text">Relájate con nuestras terapias de masajes, sauna seco y vapor. Reserva tu turno de relajación total vía Telegram.</p>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" style="width:100%; height:250px; object-fit:cover; border-radius:10px; margin-bottom: 20px;" alt="Pool">
                    <div style="background:#f9f9f9; padding: 20px; border-radius: 8px; border-left: 5px solid #2980b9;">
                        <h3 style="color:#2980b9; font-size:1.8rem; margin:0;">🏊 Piscinas Climatizadas</h3>
                        <p class="b-text">Disfruta de nuestra piscina techada para invierno y la enorme piscina al aire libre para disfrutar del sol de verano con servicio de bar.</p>
                    </div>
                </div>
                <div class="b-footer" style="background:#27ae60;">El descanso que mereces</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 6: Eventos -->
    <div class="modal-overlay" id="modal-6">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-6')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-6', '6_Eventos.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-6">
                <div class="b-header" style="background:#8e44ad;"><h1 style="color:white;">Eventos y Bodas</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color: #8e44ad; border-color: #8e44ad;">El escenario perfecto</h2>
                    <p class="b-text">Organiza conferencias, reuniones corporativas o la boda de tus sueños en nuestros salones de primer nivel.</p>
                    <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Event">
                    
                    <div class="b-grid" style="margin-top: auto;">
                        <div class="b-box" style="border-color: #8e44ad;">
                            <h3 style="color:#8e44ad; font-size:1.5rem;">Salón Gran Cedro</h3>
                            <p>Capacidad para 300 personas. Proyectores 4K, sonido envolvente y pista de baile. Ideal para bodas y galas.</p>
                        </div>
                        <div class="b-box" style="border-color: #8e44ad;">
                            <h3 style="color:#8e44ad; font-size:1.5rem;">Sala de Juntas</h3>
                            <p>Para 15 personas. Ambiente privado, pantallas interactivas y catering ejecutivo para tus negocios.</p>
                        </div>
                    </div>
                </div>
                <div class="b-footer" style="background:#8e44ad;">Hotel Los Cedros Corporativo</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 7: Guía -->
    <div class="modal-overlay" id="modal-7">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-7')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-7', '13_Guia_Huesped.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-7">
                <div class="b-header" style="background:#e74c3c;"><h1 style="color:white;">Guía del Huésped</h1></div>
                <div class="b-content">
                    <table style="width:100%; border-collapse:collapse; margin-bottom:30px; font-size:1.4rem;">
                        <tr style="background:#f9f9f9;"><td style="padding:20px; border-bottom:2px solid #ddd;"><b>Check-in:</b></td><td style="padding:20px; border-bottom:2px solid #ddd;">14:00 hrs</td></tr>
                        <tr><td style="padding:20px; border-bottom:2px solid #ddd;"><b>Check-out:</b></td><td style="padding:20px; border-bottom:2px solid #ddd;">11:30 hrs</td></tr>
                        <tr style="background:#f9f9f9;"><td style="padding:20px; border-bottom:2px solid #ddd;"><b>WiFi:</b></td><td style="padding:20px; border-bottom:2px solid #ddd;">Pass: <i>huespedVIP2025</i></td></tr>
                        <tr><td style="padding:20px; border-bottom:2px solid #ddd;"><b>Desayuno:</b></td><td style="padding:20px; border-bottom:2px solid #ddd;">06:30 - 10:00 hrs</td></tr>
                    </table>
                    <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" class="b-image-fill" style="height:250px;" alt="Reception">
                    <div style="background:#ffeeee; border-left:8px solid #e74c3c; padding:30px; margin-top: auto; border-radius: 8px;">
                        <h3 style="color:#e74c3c; margin-top:0; font-size: 1.8rem;">¿Problemas en tu habitación?</h3>
                        <p class="b-text" style="margin-bottom:0;">No pierdas tiempo llamando a recepción. Escríbele a nuestro Asistente Inteligente por Telegram para solicitar toallas, limpieza o servicio técnico al instante.</p>
                    </div>
                </div>
                <div class="b-footer" style="background:#e74c3c;">Disfrute su estadía</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 8: Menu Restaurante -->
    <div class="modal-overlay" id="modal-8">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-8')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-8', '5_Menu_Restaurante.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-8">
                <div class="b-header" style="background:#d35400;"><h1 style="color:white;">Menú "El Roble"</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#d35400; border-color:#d35400;">Delicias de Autor</h2>
                    <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Restaurant">
                    <div class="b-text" style="font-size: 1.4rem; padding: 20px; background: #f9f9f9; border-radius: 8px; margin-bottom: 20px;">
                        <b>Desayunos:</b> Buffet continental, opciones sin gluten y barra de frutas tropicales.
                    </div>
                    <div class="b-text" style="font-size: 1.4rem; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                        <b>Almuerzo y Cena:</b> Cortes de carne Premium, pastas artesanales y comida local de alta gama preparada por chefs de élite.
                    </div>
                    <div style="background:#fff3e0; padding:30px; border-radius:10px; text-align:center; margin-top:auto; border: 2px dashed #d35400;">
                        <h3 style="color:#d35400; font-size:1.8rem; margin:0;">Room Service Automático</h3>
                        <p style="font-size: 1.3rem;">Ordena tu comida desde la cama usando el chat de N8N. El pedido llega directo a la pantalla de la cocina.</p>
                    </div>
                </div>
                <div class="b-footer" style="background:#d35400;">Sabores inolvidables</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 9: Guía Turística -->
    <div class="modal-overlay" id="modal-9">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-9')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-9', '7_Guia_Turistica.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-9">
                <div class="b-header" style="background:#16a085;"><h1 style="color:white;">Descubre la Ciudad</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#16a085; border-color:#16a085;">A pocos pasos del hotel</h2>
                    <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80" class="b-image-fill" style="height: 300px;" alt="City">
                    <ul class="b-text" style="line-height:3; font-size: 1.4rem; background: #f9f9f9; padding: 30px 30px 30px 60px; border-radius: 12px;">
                        <li>🏛️ <b>Plaza Principal:</b> A 3 cuadras de distancia.</li>
                        <li>🛍️ <b>Centro Comercial:</b> A 10 minutos en taxi.</li>
                        <li>🎭 <b>Teatro Nacional:</b> Cartelera cultural diaria.</li>
                        <li>🌳 <b>Parque Botánico:</b> Ideal para trotar por la mañana.</li>
                    </ul>
                    <p class="b-text" style="margin-top:auto; text-align:center; font-weight: bold; font-size: 1.5rem; color: #16a085;">
                        <i>*Consulta a nuestro asistente bot por mapas interactivos.</i>
                    </p>
                </div>
                <div class="b-footer" style="background:#16a085;">Turismo Seguro con Los Cedros</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 10: Pet Friendly -->
    <div class="modal-overlay" id="modal-10">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-10')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-10', '8_PetFriendly.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-10">
                <div class="b-header" style="background:#f39c12;"><h1 style="color:white;">Somos Pet-Friendly</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#f39c12; border-color:#f39c12;">Tus mejores amigos son bienvenidos</h2>
                    <p class="b-text">En Los Cedros amamos a los animales. Contamos con habitaciones exclusivas en la planta baja totalmente adaptadas y seguras para perros y gatos.</p>
                    <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Dog">
                    <div class="b-box" style="border-left-color:#e67e22; margin-top:auto; font-size: 1.3rem;">
                        <h3 style="margin-top:0; font-size: 1.8rem; color: #e67e22;">Normas y Servicios:</h3>
                        <ul style="line-height: 2;">
                            <li>Uso obligatorio de correa en áreas comunes y pasillos.</li>
                            <li>Incluimos plato de comida y cama especial en tu habitación.</li>
                            <li>Área de césped exclusiva para mascotas en la parte posterior.</li>
                        </ul>
                    </div>
                </div>
                <div class="b-footer" style="background:#f39c12;">Hotel Los Cedros Pets</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 11: Transporte -->
    <div class="modal-overlay" id="modal-11">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-11')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-11', '9_Transporte.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-11">
                <div class="b-header" style="background:#34495e;"><h1 style="color:white;">Servicio de Traslados</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#34495e; border-color:#34495e;">Movilidad Segura 24/7</h2>
                    <p class="b-text">Para su seguridad y comodidad, el Hotel Los Cedros ofrece traslados exclusivos y city tours con conductores certificados.</p>
                    <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Car transfer">
                    <div class="b-grid" style="margin-top:auto;">
                        <div class="b-box" style="border-color:#34495e;">
                            <h3 style="color:#34495e; font-size:1.6rem;">✈️ Shuttle Aeropuerto</h3>
                            <p>Salidas cada 2 horas directo al aeropuerto internacional. Costo adicional para clientes regulares. <b>Gratis para nivel VIP</b>.</p>
                        </div>
                        <div class="b-box" style="border-color:#34495e;">
                            <h3 style="color:#34495e; font-size:1.6rem;">🚕 Taxis Ejecutivos</h3>
                            <p>Autos privados disponibles en la puerta principal. Solicita uno enviando un mensaje a nuestro bot de Telegram.</p>
                        </div>
                    </div>
                </div>
                <div class="b-footer" style="background:#34495e;">Llega siempre a tiempo</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 12: Promociones -->
    <div class="modal-overlay" id="modal-12">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-12')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-12', '10_Promociones.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-12">
                <div class="b-header" style="background:#c0392b;"><h1 style="color:white;">Temporada de Promociones</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#c0392b; border-color:#c0392b;">Ofertas Exclusivas 2026</h2>
                    <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Gifts">
                    <div style="border:4px dashed #c0392b; padding:40px; text-align:center; background:#fdf0ed; border-radius:15px; margin-top:20px;">
                        <h3 style="color:#c0392b; margin:0; font-size: 2.5rem; letter-spacing: 2px;">CUPÓN: VERANOVIP</h3>
                        <p style="font-size: 1.5rem; margin-top: 20px;">Obtén un <b>20% de descuento</b> en reservas de más de 3 noches realizando tu pago online a través de nuestro chatbot web.</p>
                    </div>
                    <p class="b-text" style="text-align:center; margin-top:auto; font-size: 1.4rem;"><b>Suscríbete a nuestro bot de Telegram</b>, ¡allí enviamos ofertas flash de último minuto todos los fines de semana!</p>
                </div>
                <div class="b-footer" style="background:#c0392b;">Ahorra con nosotros</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 13: Manual IA -->
    <div class="modal-overlay" id="modal-13">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-13')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-13', '11_Manual_IA_Telegram.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure triptico" id="brochure-13">
                <div class="triptico-panel">
                    <h2 style="color:#2980b9; font-family:'Playfair Display'; font-size: 2.2rem;">1. Encuéntranos</h2>
                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80" class="triptico-image" alt="Smartphone">
                    <p class="b-text">Abre tu app de Telegram y busca nuestro usuario oficial: <br><br><b style="font-size:1.5rem; color:#2980b9;">@LosCedrosBot</b></p>
                    <p class="b-text">Dale al botón <i>"Iniciar"</i> y nuestro asistente impulsado por Groq se activará de inmediato.</p>
                </div>
                <div class="triptico-panel">
                    <h2 style="color:#2980b9; font-family:'Playfair Display'; font-size: 2.2rem;">2. Pide lo que sea</h2>
                    <img src="https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=400&q=80" class="triptico-image" alt="Chatting">
                    <p class="b-text">El bot entiende lenguaje humano natural. Intenta con:</p>
                    <ul class="b-text" style="line-height:2;">
                        <li>"Quiero reservar para mañana"</li>
                        <li>"¿Qué precio tiene la suite presidencial?"</li>
                        <li>"Mándame una toalla a la habitación"</li>
                    </ul>
                </div>
                <div class="triptico-panel" style="background:#2980b9;">
                    <h2 style="color:white; font-size: 2.5rem;">3. Magia Pura (N8N)</h2>
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80" class="triptico-image" alt="Cyber">
                    <p style="margin-top:auto; font-size:1.3rem; line-height:2;">Gracias a la potente tecnología de <b>N8N</b>, el bot se conecta directamente a la base de datos del hotel, revisa la disponibilidad real y gestiona tus reservas en milisegundos.</p>
                </div>
            </div></div>
        </div>
    </div>

    <!-- Modal 14: Hotel del Futuro -->
    <div class="modal-overlay" id="modal-14">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-14')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-14', '14_Hotel_B2B.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-14">
                <div class="b-header" style="background:#34495e;"><h1 style="color:#f1c40f;">El Hotel del Futuro (B2B)</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#34495e; border-color:#34495e;">Transformación Digital Total</h2>
                    <p class="b-text">El Hotel Los Cedros es pionero en la automatización de procesos operativos (BPM) mediante herramientas No-Code y bases de datos en la nube (Railway).</p>
                    <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Tech Business">
                    <div class="b-grid" style="margin-top: auto;">
                        <div class="b-box" style="border-color:#34495e;">
                            <h3 style="color:#34495e; font-size: 1.5rem;">Eficiencia de Costos</h3>
                            <p>El chatbot automatizado maneja el 85% de las consultas repetitivas de recepción, permitiendo reducir significativamente el personal de call center.</p>
                        </div>
                        <div class="b-box" style="border-color:#34495e;">
                            <h3 style="color:#34495e; font-size: 1.5rem;">Reportes IA</h3>
                            <p>El administrador general genera reportes complejos de ocupación y ventas en formato Excel o PDF con un solo comando conversacional en el chat web.</p>
                        </div>
                    </div>
                </div>
                <div class="b-footer" style="background:#34495e;">Modelo de Franquicia Tecnológica 2026</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 15: Seguridad -->
    <div class="modal-overlay" id="modal-15">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-15')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-15', '15_Privacidad_Seguridad.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-15">
                <div class="b-header" style="background:#1abc9c;"><h1 style="color:white;">Seguridad y Privacidad</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#1abc9c; border-color:#1abc9c;">Tus datos en buenas manos</h2>
                    <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Security Lock">
                    <p class="b-text">Con la integración de N8N, servidores Laravel en Railway y modelos Groq, garantizamos que toda tu información personal esté blindada bajo estándares de grado bancario.</p>
                    <ul class="b-text" style="line-height:2.2; background: #f0fbf9; padding: 30px 40px; border-radius: 12px; margin-top: auto;">
                        <li>🔒 Contraseñas fuertemente encriptadas con algoritmos BCRYPT nativos de Laravel.</li>
                        <li>🛡️ Comunicación Webhook asegurada por canales encriptados (HTTPS/SSL).</li>
                        <li>👁️‍🗨️ Política estricta: La Inteligencia Artificial NO se entrena usando los datos privados de tus reservas.</li>
                        <li>💳 Los pagos son procesados externamente (PCI DSS), sin guardar tarjetas en nuestros servidores locales.</li>
                    </ul>
                </div>
                <div class="b-footer" style="background:#1abc9c;">Protección Cibernética Los Cedros</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 16: Automatizacion Staff -->
    <div class="modal-overlay" id="modal-16">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-16')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-16', '16_Manual_Staff.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-16">
                <div class="b-header" style="background:#e67e22;"><h1 style="color:white;">Uso Interno: Staff</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#e67e22; border-color:#e67e22;">Automatiza tu turno de trabajo</h2>
                    <p class="b-text">En el Hotel Los Cedros, los equipos de Recepción y Limpieza trabajan de la mano con el bot de N8N para eliminar el estrés y la burocracia.</p>
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" class="b-image-fill" style="height: 300px;" alt="Office working">
                    <div style="background:#fdf2e9; padding:35px; border-radius:12px; border-left: 8px solid #e67e22; margin-top: auto;">
                        <h3 style="margin-top:0; color:#e67e22; font-size: 1.8rem;">Ejemplo: Pedir un reporte de limpieza</h3>
                        <p class="b-text" style="margin-bottom:0; font-size: 1.3rem;">Ya no tienes que revisar el sistema cuarto por cuarto. Simplemente ingresa a tu panel web, abre el chat del Administrador y escribe:<br><br> <i>"Genera un reporte PDF de todas las habitaciones que necesitan limpieza"</i>.<br><br>N8N buscará en la base de datos, armará el archivo y te lo enviará directamente para que lo descargues en 5 segundos.</p>
                    </div>
                </div>
                <div class="b-footer" style="background:#e67e22;">Eficiencia Operativa Inteligente</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 17: Sostenibilidad -->
    <div class="modal-overlay" id="modal-17">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-17')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-17', '17_Sostenibilidad.pdf')">📥 Descargar PDF</button>
            <div class="brochure-wrapper"><div class="brochure" id="brochure-17">
                <div class="b-header" style="background:#2ecc71;"><h1 style="color:white;">Sostenibilidad Cero Papel</h1></div>
                <div class="b-content">
                    <h2 class="b-title" style="color:#2ecc71; border-color:#2ecc71;">Cuidamos el planeta con tecnología</h2>
                    <p class="b-text">Gracias a nuestra robusta arquitectura tecnológica basada en N8N y Laravel, el Hotel Los Cedros ha logrado reducir el uso de papel impreso en un asombroso 95%.</p>
                    <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80" class="b-image-fill" alt="Nature">
                    <div class="b-grid" style="margin-top:auto;">
                        <div class="b-box" style="border-color:#2ecc71;">
                            <h3 style="color:#2ecc71; font-size: 1.5rem;">Facturación Digital PDF</h3>
                            <p>Tus facturas y recibos son procesados y enviados automáticamente a tu correo electrónico al momento exacto del Check-out.</p>
                        </div>
                        <div class="b-box" style="border-color:#2ecc71;">
                            <h3 style="color:#2ecc71; font-size: 1.5rem;">Reservas en la Nube</h3>
                            <p>Olvídate de los engorrosos formularios impresos. Toda tu reserva queda registrada de forma segura en la base de datos cloud de Railway.</p>
                        </div>
                    </div>
                </div>
                <div class="b-footer" style="background:#2ecc71;">Compromiso Verde del Hotel Los Cedros</div>
            </div></div>
        </div>
    </div>

    <!-- Modal 18: Manual Completo Multipagina -->
    <div class="modal-overlay" id="modal-18">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('modal-18')">&times;</button>
            <button class="download-btn" onclick="downloadPDF('brochure-18', '18_Manual_Tecnico_General.pdf')">📥 Descargar PDF (18 Páginas)</button>
            <div class="brochure-wrapper" id="brochure-18">
                
                <!-- Pagina 1: Portada -->
                <div class="brochure-page" style="background: var(--primary); color: white; justify-content: center; align-items: center; text-align: center;">
                    <h1 style="font-family: 'Playfair Display'; font-size: 5rem; color: var(--secondary);">Hotel Los Cedros</h1>
                    <h2 style="font-size: 2.5rem; font-weight: 300; margin-top: 20px;">Manual Técnico del Software</h2>
                    <div style="width: 100px; height: 5px; background: var(--secondary); margin: 40px auto;"></div>
                    <p style="font-size: 1.5rem;">Arquitectura, Backend (Laravel) y Automatización IA (N8N)</p>
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80" style="width: 500px; height: 300px; object-fit: cover; border-radius: 15px; margin-top: 50px; border: 4px solid var(--secondary);">
                    <p style="position: absolute; bottom: 50px; font-size: 1.2rem; opacity: 0.7;">Versión 2026 - Uso Exclusivo Administración</p>
                </div>

                <!-- Pagina 2: Indice -->
                <div class="brochure-page">
                    <div class="b-header"><h1>Índice de Contenidos</h1></div>
                    <div class="b-content">
                        <ul style="font-size: 1.6rem; line-height: 2.5; list-style: none; padding: 0;">
                            <li><b>1.</b> Resumen Ejecutivo del Proyecto</li>
                            <li><b>2.</b> Arquitectura Base (Laravel)</li>
                            <li><b>3.</b> Modelos y Base de Datos (Eloquent)</li>
                            <li><b>4.</b> Autenticación y Seguridad (Google Auth)</li>
                            <li><b>5.</b> Gestión de Roles y Permisos</li>
                            <li><b>6.</b> Estructura de Controladores HTTP</li>
                            <li><b>7.</b> Eventos y Listeners (Notificaciones)</li>
                            <li><b>8.</b> Envíos de Email Automatizados</li>
                            <li><b>9.</b> Proveedores de Servicio (Providers)</li>
                            <li><b>10.</b> Motor de Reservas</li>
                            <li><b>11.</b> Integración N8N (Inteligencia Artificial)</li>
                            <li><b>12.</b> Comunicación Webhook</li>
                            <li><b>13.</b> Interfaz Frontend (Inertia + React)</li>
                            <li><b>14.</b> Despliegue en Railway</li>
                            <li><b>15.</b> Seguridad de Datos</li>
                            <li><b>16.</b> Flujos Operativos del Staff</li>
                            <li><b>17.</b> Guía Rápida para Administradores</li>
                            <li><b>18.</b> Contacto y Soporte Técnico</li>
                        </ul>
                    </div>
                </div>

                <!-- Pagina 3: Resumen -->
                <div class="brochure-page">
                    <div class="b-header"><h1>1. Resumen Ejecutivo</h1></div>
                    <div class="b-content">
                        <p class="b-text">El software de gestión del Hotel Los Cedros representa la cúspide de la tecnología de hospitalidad moderna. Diseñado para centralizar operaciones, reducir la carga administrativa y elevar la experiencia del huésped.</p>
                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                        <p class="b-text">Al combinar el framework backend más robusto (Laravel) con herramientas de automatización Low-Code (N8N) y modelos de IA generativa (Groq), hemos creado un sistema que no solo guarda datos, sino que interactúa, predice y responde en tiempo real.</p>
                    </div>
                    <div class="b-footer">Página 3</div>
                </div>

                <!-- Pagina 4: Arquitectura -->
                <div class="brochure-page">
                    <div class="b-header"><h1>2. Arquitectura Base</h1></div>
                    <div class="b-content">
                        <h2 class="b-title" style="font-size:1.8rem;">Patrón MVC (Laravel)</h2>
                        <p class="b-text">El núcleo del sistema reside en el framework PHP Laravel, operando bajo un patrón Modelo-Vista-Controlador. La carpeta <code>app/</code> contiene el corazón de la lógica de negocio.</p>
                        <div class="b-box">
                            <h3 style="color:var(--primary);">Componentes:</h3>
                            <ul style="line-height:2; font-size:1.2rem;">
                                <li><b>Models:</b> Representación de tablas (Rooms, Bookings, Users).</li>
                                <li><b>Http/Controllers:</b> Lógica de peticiones (ReservationsController).</li>
                                <li><b>Actions:</b> Clases de lógica de negocio pura para reutilización.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="b-footer">Página 4</div>
                </div>

                <!-- Pagina 5: Autenticacion -->
                <div class="brochure-page">
                    <div class="b-header"><h1>3. Autenticación Fuerte</h1></div>
                    <div class="b-content">
                        <h2 class="b-title" style="font-size:1.8rem;">CustomLoginResponse & Google Auth</h2>
                        <p class="b-text">El sistema cuenta con autenticación OAuth conectada a Google Cloud. Las clases como <code>CustomLoginResponse.php</code> permiten redirigir inteligentemente a los usuarios dependiendo de su rol al iniciar sesión.</p>
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                        <p class="b-text">Si eres administrador, serás llevado al Dashboard. Si eres huésped, al catálogo web.</p>
                    </div>
                    <div class="b-footer">Página 5</div>
                </div>

                <!-- Pagina 6: Roles -->
                <div class="brochure-page">
                    <div class="b-header"><h1>4. Roles y Permisos</h1></div>
                    <div class="b-content">
                        <p class="b-text">Utilizando paquetes robustos de roles (Spatie Permission), el software aísla las capacidades del sistema. Un huésped jamás podrá acceder a la configuración del bot o la base de datos de usuarios.</p>
                        <div class="b-grid" style="margin-top:40px;">
                            <div class="b-box"><h3>Administrador</h3><p>Acceso total a reportes, N8N, usuarios y configuraciones financieras.</p></div>
                            <div class="b-box"><h3>Recepcionista</h3><p>Gestión de check-in, check-out y estados de habitaciones.</p></div>
                        </div>
                    </div>
                    <div class="b-footer">Página 6</div>
                </div>

                <!-- Pagina 7: Base de Datos -->
                <div class="brochure-page">
                    <div class="b-header"><h1>5. Base de Datos (Eloquent)</h1></div>
                    <div class="b-content">
                        <h2 class="b-title" style="font-size:1.8rem;">Carpeta app/Models</h2>
                        <p class="b-text">Las entidades están mapeadas mediante el ORM Eloquent. El modelo <code>User</code> se relaciona con <code>Booking</code> (Reservas), que a su vez se relaciona con <code>Room</code> (Habitaciones). Todo gestionado con migraciones estrictas de PostgreSQL en Railway.</p>
                        <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                    </div>
                    <div class="b-footer">Página 7</div>
                </div>

                <!-- Pagina 8: Eventos y Listeners -->
                <div class="brochure-page">
                    <div class="b-header"><h1>6. Sistema de Eventos</h1></div>
                    <div class="b-content">
                        <h2 class="b-title" style="font-size:1.8rem;">Reactividad del Backend</h2>
                        <p class="b-text">En la carpeta <code>app/Listeners</code> y <code>app/Events</code>, el sistema escucha acciones clave. Ejemplo: Cuando se crea una reserva (<code>BookingCreatedEvent</code>), se dispara un listener que avisa a recepción e inicia el envío del comprobante sin detener la carga de la página del usuario.</p>
                    </div>
                    <div class="b-footer">Página 8</div>
                </div>

                <!-- Pagina 9: Correos -->
                <div class="brochure-page">
                    <div class="b-header"><h1>7. Correos Automáticos</h1></div>
                    <div class="b-content">
                        <h2 class="b-title" style="font-size:1.8rem;">Carpeta app/Mail</h2>
                        <p class="b-text">Las clases Mailable estructuran los correos. Se generan plantillas HTML dinámicas para enviar comprobantes de pago, confirmaciones de reserva y tickets de soporte técnico al correo de los huéspedes.</p>
                        <img src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                    </div>
                    <div class="b-footer">Página 9</div>
                </div>

                <!-- Pagina 10: IA y N8N -->
                <div class="brochure-page">
                    <div class="b-header"><h1>8. Inteligencia Artificial N8N</h1></div>
                    <div class="b-content">
                        <p class="b-text">El punto más fuerte de innovación. Hemos conectado el framework Laravel con la plataforma N8N. Utilizando Webhooks, el software notifica a la IA (Groq Gemini) sobre la base de datos actual para que responda dudas por Telegram con datos 100% reales.</p>
                        <div class="b-box" style="margin-top:auto;">
                            <h3>Flujo:</h3>
                            <p>Usuario Telegram → N8N Webhook → API Laravel → N8N → Usuario Telegram.</p>
                        </div>
                    </div>
                    <div class="b-footer">Página 10</div>
                </div>

                <!-- Pagina 11: Webhooks -->
                <div class="brochure-page">
                    <div class="b-header"><h1>9. API y Webhooks</h1></div>
                    <div class="b-content">
                        <p class="b-text">La comunicación entre la app web y el bot N8N ocurre a través del endpoint configurado en la variable <code>N8N_WEBHOOK_URL</code> del archivo <code>.env</code>. Esto garantiza una capa de comunicación asíncrona robusta.</p>
                        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                    </div>
                    <div class="b-footer">Página 11</div>
                </div>

                <!-- Pagina 12: Frontend -->
                <div class="brochure-page">
                    <div class="b-header"><h1>10. Frontend React/Inertia</h1></div>
                    <div class="b-content">
                        <p class="b-text">No usamos vistas de plantilla antiguas. La interfaz de usuario es una SPA (Single Page Application) construida con React y conectada al backend vía Inertia.js. Esto significa navegaciones instantáneas sin recargar la página.</p>
                    </div>
                    <div class="b-footer">Página 12</div>
                </div>

                <!-- Pagina 13: Despliegue -->
                <div class="brochure-page">
                    <div class="b-header"><h1>11. Entorno de Producción</h1></div>
                    <div class="b-content">
                        <p class="b-text">Todo el ecosistema (Base de Datos PostgreSQL, Servidor Laravel y N8N) está alojado en contenedores Docker gestionados por <b>Railway</b>, asegurando un 99.9% de uptime y escalabilidad automática.</p>
                        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                    </div>
                    <div class="b-footer">Página 13</div>
                </div>

                <!-- Pagina 14: Providers -->
                <div class="brochure-page">
                    <div class="b-header"><h1>12. Providers (app/Providers)</h1></div>
                    <div class="b-content">
                        <p class="b-text">Los Service Providers inicializan la aplicación. Aquí se registran las políticas de autorización, eventos y bindings del contenedor de inyección de dependencias de Laravel antes de procesar cada petición HTTP.</p>
                    </div>
                    <div class="b-footer">Página 14</div>
                </div>

                <!-- Pagina 15: Seguridad -->
                <div class="brochure-page">
                    <div class="b-header"><h1>13. Protocolos de Seguridad</h1></div>
                    <div class="b-content">
                        <ul class="b-text" style="line-height:2.5;">
                            <li>Tokens CSRF en todos los formularios React.</li>
                            <li>Middlewares de autenticación estricta (Sanctum/Session).</li>
                            <li>Encriptación BCRYPT para contraseñas.</li>
                            <li>Protección contra SQL Injection nativa de Eloquent.</li>
                        </ul>
                    </div>
                    <div class="b-footer">Página 15</div>
                </div>

                <!-- Pagina 16: Bootstrap -->
                <div class="brochure-page">
                    <div class="b-header"><h1>14. Arranque (Bootstrap)</h1></div>
                    <div class="b-content">
                        <p class="b-text">La carpeta <code>bootstrap/</code> contiene los archivos de caché del framework y el archivo <code>app.php</code> que enciende la maquinaria de Laravel, conectando las interfaces con sus implementaciones y manejando las excepciones globales.</p>
                        <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80" class="b-image-fill">
                    </div>
                    <div class="b-footer">Página 16</div>
                </div>

                <!-- Pagina 17: Soporte -->
                <div class="brochure-page">
                    <div class="b-header"><h1>15. Flujos Operativos</h1></div>
                    <div class="b-content">
                        <p class="b-text">Los administradores utilizan el sistema para controlar la facturación, mientras que el personal de piso utiliza N8N a través de sus móviles para registrar incidencias sin necesidad de computadoras físicas.</p>
                    </div>
                    <div class="b-footer">Página 17</div>
                </div>

                <!-- Pagina 18: Contraportada -->
                <div class="brochure-page" style="background: var(--primary); color: white; justify-content: center; align-items: center; text-align: center;">
                    <h1 style="font-family: 'Playfair Display'; font-size: 4rem; color: var(--secondary);">Fin del Documento</h1>
                    <p style="font-size: 1.5rem; margin-top:30px;">Propiedad Intelectual: Hotel Los Cedros 2026</p>
                    <p style="font-size: 1.2rem; opacity:0.8;">Desarrollado con Laravel, React y N8N.</p>
                    <div style="width: 50px; height: 50px; background: var(--secondary); margin-top: 50px; border-radius: 50%;"></div>
                </div>

            </div>
        </div>
    </div>`;

    return (
        <div className="folletos-page">
            <Head title="Folletos - Hotel Los Cedros" />
            <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
        </div>
    );
}
