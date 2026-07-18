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
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class Robust3000Seeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🚀 Iniciando Sembrador Robust3000...');
        
        // 1. Asegurar roles
        $clienteRole = Role::firstOrCreate(['name' => 'cliente']);
        
        // 2. Cargar datos base necesarios
        $tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')->get();
        $tipoPagos = TipoPago::all();
        $recepcionistas = Recepcionista::all();
        $servicios = Servicio::where('estado', 'activo')->get();
        $platillos = Platillo::where('estado', 'disponible')->get();
        $habitacionesEventos = HabitacionEvento::all();

        if ($tiposHabitacion->isEmpty() || $tipoPagos->isEmpty() || $recepcionistas->isEmpty() || $habitacionesEventos->isEmpty()) {
            $this->command->error('❌ Faltan datos base en las tablas (tipos de habitación, recepcionistas, habitaciones_eventos). Por favor corre los otros seeders primero.');
            return;
        }

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
        
        $this->command->info("📅 Generando {$cantidad} Reservas, Check-ins y Cuentas asociadas...");
        
        $fechaInicioSeeder = Carbon::create(2024, 1, 1);
        $fechaFinSeeder = Carbon::now();

        foreach ($creados as $index => $user) {
            // Fecha aleatoria para la reserva
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
            $habitacion = $habitacionesEventos->where('tipo_habitacion_id', $tipoHab->id)->random();
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
