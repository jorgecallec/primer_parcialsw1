<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Reserva;
use App\Models\Hospedaje;
use App\Models\Factura;
use App\Models\Pago;
use App\Models\Checkin;
use App\Models\Recepcionista;
use App\Models\HabitacionEvento;
use App\Models\Cuenta;
use App\Models\Transaccion;
use App\Models\Servicio;
use App\Models\Platillo;
use App\Models\TipoHabitacion;
use App\Models\TipoPago;
use App\Models\Categoria;
use App\Models\Comentario;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class Robust3000Seeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🚀 Iniciando Sembrador Robust3000 de Alto Rendimiento...');
        
        // 1. Asegurar roles
        $clienteRole = Role::firstOrCreate(['name' => 'cliente']);
        
        // 2. Generar Platillos Masivos (200 platillos temáticos de hotel)
        $this->command->info('🍽️ Generando Platillos Masivos...');
        $platosNombres = ['Sopa', 'Ensalada', 'Filete', 'Pescado', 'Pollo', 'Arroz', 'Pasta', 'Postre', 'Tarta', 'Café', 'Jugo', 'Cóctel', 'Vino', 'Cerveza', 'Hamburguesa', 'Sándwich', 'Pizza', 'Tacos', 'Ceviche', 'Lomo'];
        $platosAdjetivos = ['Especial', 'de la Casa', 'Gourmet', 'Imperial', 'Tradicional', 'Campestre', 'Mariano', 'Tropical', 'Cedros', 'Rústico', 'de la Huerta', 'Mediterráneo', 'al Horno', 'a la Parrilla', 'Flambeado', 'Exótico'];
        $categoriasPlatillos = Categoria::where('tipo', 'platillo')->get();
        
        if (!$categoriasPlatillos->isEmpty()) {
            for ($i = 0; $i < 200; $i++) {
                $nombrePlatillo = $platosNombres[array_rand($platosNombres)] . ' ' . $platosAdjetivos[array_rand($platosAdjetivos)] . ' ' . rand(1, 99);
                Platillo::firstOrCreate(
                    ['nombre' => $nombrePlatillo],
                    [
                        'categoria_id' => $categoriasPlatillos->random()->id,
                        'nombre' => $nombrePlatillo,
                        'descripcion' => "Exquisito platillo preparado por nuestro chef ejecutivo usando los ingredientes más selectos de la región.",
                        'ingredientes' => "Ingredientes frescos seleccionados.",
                        'image_url' => 'https://public.images/platillo_default.jpg',
                        'precio' => rand(25, 250),
                        'estado' => 'disponible'
                    ]
                );
            }
        }

        // 3. Generar Servicios Masivos (100 servicios de hotel)
        $this->command->info('🛎️ Generando Servicios Masivos...');
        $serviciosNombres = ['Spa', 'Masaje', 'Tratamiento', 'Clase', 'Tour', 'Transporte', 'Alquiler', 'Acceso', 'Sesión', 'Guía', 'Servicio'];
        $serviciosDetalle = ['Relajante', 'Premium', 'VIP', 'Privado', 'Grupal', 'Familiar', 'Nocturno', 'Express', 'Completo', 'Personalizado', 'de Lujo'];
        $categoriasServicios = Categoria::where('tipo', 'servicio')->get();
        
        if (!$categoriasServicios->isEmpty()) {
            for ($i = 0; $i < 100; $i++) {
                $nombreServicio = $serviciosNombres[array_rand($serviciosNombres)] . ' ' . $serviciosDetalle[array_rand($serviciosDetalle)] . ' ' . rand(1, 99);
                Servicio::firstOrCreate(
                    ['nombre' => $nombreServicio],
                    [
                        'categoria_id' => $categoriasServicios->random()->id,
                        'nombre' => $nombreServicio,
                        'descripcion' => "Servicio exclusivo diseñado para la comodidad, relax y disfrute de nuestros huéspedes en Hotel Los Cedros.",
                        'precio' => rand(50, 450),
                        'estado' => 'activo'
                    ]
                );
            }
        }

        // 4. Generar Habitaciones Físicas Masivas (500 habitaciones distribuidas en 5 pisos)
        $this->command->info('🏠 Generando Habitaciones Físicas Masivas (500 habitaciones)...');
        $pisos = ['1', '2', '3', '4', '5'];
        $alas = ['Torre Norte', 'Torre Sur', 'Ala Este', 'Ala Oeste', 'Edificio Principal'];
        $vistas = ['Mar', 'Jardín', 'Ciudad', 'Montaña', 'Piscina', 'Interior'];
        $estados = ['disponible', 'ocupada', 'limpieza', 'mantenimiento'];
        $tiposHab = TipoHabitacion::all();
        
        if (!$tiposHab->isEmpty()) {
            foreach ($pisos as $piso) {
                for ($num = 1; $num <= 100; $num++) {
                    $codigo = $piso . str_pad($num, 2, '0', STR_PAD_LEFT);
                    
                    if (!HabitacionEvento::where('codigo', $codigo)->exists()) {
                        $tipo = $tiposHab->random();
                        HabitacionEvento::create([
                            'codigo' => $codigo,
                            'tipo_habitacion_id' => $tipo->id,
                            'nombre' => $tipo->nombre,
                            'estado' => $estados[array_rand($estados)],
                            'piso' => $piso,
                            'ala_seccion' => $alas[array_rand($alas)],
                            'vista' => $vistas[array_rand($vistas)],
                            'ultima_limpieza' => Carbon::now()->subDays(rand(0, 5)),
                        ]);
                    }
                }
            }
        }

        // Cargar datos cargados recientemente para usar en las reservas
        $tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')->get();
        $tipoPagos = TipoPago::all();
        $recepcionistas = Recepcionista::all();
        $servicios = Servicio::where('estado', 'activo')->get();
        $platillos = Platillo::where('estado', 'disponible')->get();
        $habitacionesEventos = HabitacionEvento::all();

        // 5. Generar Clientes Masivos (1000 clientes con datos reales)
        $cantidad = 1000;
        $this->command->info("👤 Generando {$cantidad} Clientes...");
        
        $nombres = ['Juan', 'María', 'José', 'Carlos', 'Luis', 'Ana', 'Pedro', 'Rosa', 'Jorge', 'Carmen', 'Miguel', 'Isabel', 'Roberto', 'Patricia', 'Daniel', 'Gabriela', 'Fernando', 'Laura', 'Ricardo', 'Silvia'];
        $apellidos = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Gutiérrez', 'Vargas'];
        $dominios = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
        
        $now = Carbon::now();
        $usersBatch = [];
        
        for ($i = 0; $i < $cantidad; $i++) {
            $nombre = $nombres[array_rand($nombres)] . ' ' . $nombres[array_rand($nombres)];
            $apellido = $apellidos[array_rand($apellidos)] . ' ' . $apellidos[array_rand($apellidos)];
            $email = strtolower(str_replace(' ', '', $nombre . $i)) . rand(100, 999) . '@' . $dominios[array_rand($dominios)];
            
            $usersBatch[] = [
                'name' => "{$nombre} {$apellido}",
                'username' => 'user_' . $i . '_' . rand(1000, 9999),
                'edad' => rand(20, 65),
                'sexo' => rand(0, 1) ? 'M' : 'F',
                'telefono' => '7' . rand(1000000, 9999999),
                'tipo_nacionalidad' => rand(0, 10) > 3 ? 'nacional' : 'extranjero',
                'email' => $email,
                'email_verified_at' => $now,
                'password' => Hash::make('123456789'),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        // Insertar usuarios masivamente
        DB::table('users')->insert($usersBatch);
        
        // Obtener los usuarios creados y registrarlos como clientes
        $creados = User::whereIn('email', array_column($usersBatch, 'email'))->get();
        $clientesBatch = [];
        foreach ($creados as $user) {
            $user->assignRole($clienteRole);
            $clientesBatch[] = [
                'id' => $user->id,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        DB::table('clientes')->insert($clientesBatch);
        
        // 6. Generar Comentarios Masivos (1000 comentarios temáticos)
        $this->command->info('💬 Generando Comentarios Masivos...');
        $comentariosTextos = [
            "Excelente servicio, el personal fue súper amable y las instalaciones son de primer nivel.",
            "Me encantó la habitación, la vista al jardín es espectacular. Muy recomendado.",
            "El restaurante del hotel ofrece platillos exquisitos. Una experiencia gastronómica inolvidable.",
            "Un hotel muy tranquilo y elegante. Perfecto para descansar en familia.",
            "El spa es increíble, salí completamente renovado. Volveré sin duda.",
            "Muy limpio, cómodo y con una ubicación excelente. Los servicios son de primera.",
            "Las suites presidenciales son espectaculares. El trato fue muy VIP.",
            "Una estadía perfecta. Los salones de eventos son muy amplios y modernos.",
            "La piscina y las áreas verdes están muy bien cuidadas. Excelente ambiente.",
            "El desayuno buffet es completísimo y muy delicioso. El personal de room service es muy atento."
        ];
        
        foreach ($creados as $user) {
            if (rand(1, 10) <= 8) { // 80% de probabilidad de dejar comentario
                Comentario::create([
                    'usuario_id' => $user->id,
                    'calificacion' => rand(4, 5),
                    'contenido' => $comentariosTextos[array_rand($comentariosTextos)],
                    'estado' => 'visible',
                    'created_at' => Carbon::now()->subDays(rand(1, 60)),
                ]);
            }
        }

        // 7. Generar Reservas, Check-ins, Cuentas, Consumos y Pagos (1000 transacciones de cliente)
        $this->command->info("📅 Generando {$cantidad} Reservas, Check-ins y Cuentas asociadas...");
        $fechaInicioSeeder = Carbon::create(2024, 1, 1);
        $fechaFinSeeder = Carbon::now();

        foreach ($creados as $index => $user) {
            $fechaReserva = Carbon::createFromTimestamp(rand($fechaInicioSeeder->timestamp, $fechaFinSeeder->timestamp));
            $diasEstadia = rand(1, 5);
            $fechaEntrada = $fechaReserva->copy()->addDays(rand(1, 10));
            $fechaSalida = $fechaEntrada->copy()->addDays($diasEstadia);

            $tipoHab = $tiposHabitacion->random();
            $precioBase = $tipoHab->precio;
            $montoTotal = $precioBase * $diasEstadia;
            $pagoInicial = $montoTotal * 0.3;

            // 1. Crear Reserva
            $reserva = Reserva::create([
                'cliente_id' => $user->id,
                'promo_id' => null,
                'total_cantidad_adultos' => rand(1, 2),
                'total_cantidad_infantes' => rand(0, 1),
                'fecha_reserva' => $fechaReserva,
                'dias_estadia' => $diasEstadia,
                'estado' => 'confirmada',
                'tipo_reserva' => 'habitacion',
                'porcentaje_descuento' => 0,
                'monto_total' => $montoTotal,
                'pago_inicial' => $pagoInicial,
                'tipo_viaje' => rand(0, 1) ? 'vacaciones' : 'negocios',
                'created_at' => $fechaReserva,
                'updated_at' => $fechaReserva,
            ]);

            // 2. Crear Hospedaje
            Hospedaje::create([
                'reserva_id' => $reserva->id,
                'tipo_habitacion_id' => $tipoHab->id,
                'cantidad' => 1,
            ]);

            // 3. Crear Factura y Pago de Reserva
            $tipoPago = $tipoPagos->random();
            $factura = Factura::create([
                'reserva_id' => $reserva->id,
                'tipo_pago_id' => $tipoPago->id,
                'monto_total' => $montoTotal,
                'monto_relativo' => $pagoInicial,
                'estado' => 'pendiente',
                'created_at' => $fechaReserva,
                'updated_at' => $fechaReserva,
            ]);

            Pago::create([
                'factura_id' => $factura->id,
                'pago_id' => 'QR-' . uniqid(),
                'monto' => $pagoInicial,
                'created_at' => $fechaReserva,
                'updated_at' => $fechaReserva,
            ]);

            // 4. Crear Check-in
            $habitacionesValidas = $habitacionesEventos->where('tipo_habitacion_id', $tipoHab->id);
            $habitacion = !$habitacionesValidas->isEmpty() ? $habitacionesValidas->random() : $habitacionesEventos->random();
            
            $checkin = Checkin::create([
                'reserva_id' => $reserva->id,
                'recepcionista_id' => $recepcionistas->random()->id,
                'cliente_id' => $user->id,
                'habitacion_evento_id' => $habitacion->id,
                'fecha_entrada' => $fechaEntrada,
                'fecha_salida' => $fechaSalida,
                'created_at' => $fechaEntrada,
                'updated_at' => $fechaSalida,
            ]);

            // 5. Crear Cuenta de Check-in
            $cuenta = Cuenta::create([
                'checkin_id' => $checkin->id,
                'monto_total' => 0,
                'monto_pagado' => 0,
                'saldo' => 0,
                'estado' => 'pagada',
                'fecha_pago' => $fechaSalida->toDateString(),
                'created_at' => $fechaEntrada,
                'updated_at' => $fechaSalida,
            ]);

            // 6. Añadir algunas transacciones de consumos (platillos/servicios)
            $montoConsumos = 0;
            for ($k = 0; $k < rand(1, 2); $k++) {
                $esServicio = rand(0, 1);
                $servicioId = $esServicio && !$servicios->isEmpty() ? $servicios->random()->id : null;
                $platilloId = !$esServicio && !$platillos->isEmpty() ? $platillos->random()->id : null;

                $trans = Transaccion::create([
                    'cuenta_id' => $cuenta->id,
                    'servicio_id' => $servicioId,
                    'platillo_id' => $platilloId,
                    'estado' => 'confirmada',
                    'cantidad' => 1,
                    'created_at' => $fechaEntrada,
                    'updated_at' => $fechaSalida,
                ]);

                $precio = $esServicio && $trans->servicio ? $trans->servicio->precio : ($trans->platillo ? $trans->platillo->precio : 20);
                $montoConsumos += $precio;
            }

            $cuenta->update([
                'monto_total' => $montoConsumos,
                'monto_pagado' => $montoConsumos,
            ]);

            // Facturar consumos
            $facturaConsumos = Factura::create([
                'cuenta_id' => $cuenta->id,
                'checkin_id' => $checkin->id,
                'tipo_pago_id' => $tipoPago->id,
                'monto_total' => $montoConsumos,
                'monto_relativo' => $montoConsumos,
                'estado' => 'pagada',
                'created_at' => $fechaSalida,
                'updated_at' => $fechaSalida,
            ]);

            Pago::create([
                'factura_id' => $facturaConsumos->id,
                'pago_id' => 'CASH-' . uniqid(),
                'monto' => $montoConsumos,
                'created_at' => $fechaSalida,
                'updated_at' => $fechaSalida,
            ]);

            if ($index > 0 && ($index + 1) % 200 == 0) {
                $this->command->info("   ✅ Progreso: " . ($index + 1) . " reservas y check-ins procesados...");
            }
        }

        $this->command->info('🎉 ¡Sembrador Robust3000 finalizado exitosamente!');
    }
}
