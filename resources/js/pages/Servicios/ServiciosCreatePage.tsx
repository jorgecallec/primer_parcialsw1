import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";
import { ArrowLeft } from "lucide-react";

interface Categoria {
  id: number;
  nombre: string;
}

interface Props {
  categorias: Categoria[];
}

export default function ServiciosCreatePage({ categorias }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: "",
    categoria_id: "",
    descripcion: "",
    precio: 0,
    estado: "activo",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("servicios.store"), {
      preserveScroll: true,
      onSuccess: () => console.log("Servicio creado"),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Servicios", href: route("servicios.index") },
        { title: "Crear", href: route("servicios.create") },
      ]}
    >
      <Head title="Crear Nuevo Servicio" />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Encabezado */}
          <div className="flex items-center gap-4">
            <Link href={route("servicios.index")}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Servicio</h1>
              <p className="text-muted-foreground">
                Completa el formulario para registrar un nuevo servicio.
              </p>
            </div>
          </div>

          <Separator />

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Información del Servicio</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={data.nombre}
                    onChange={(e) => setData("nombre", e.target.value)}
                    className={errors.nombre ? "border-red-500" : ""}
                  />
                  {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                </div>

                {/* Categoría */}
                <div>
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select
                    value={data.categoria_id}
                    onValueChange={(value) => setData("categoria_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id.toString()}>
                          {categoria.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoria_id && (
                    <p className="text-red-500 text-sm">{errors.categoria_id}</p>
                  )}
                </div>

                {/* Descripción */}
                <div className="col-span-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={data.descripcion}
                    onChange={(e) => setData("descripcion", e.target.value)}
                  />
                </div>

                {/* Precio */}
                <div>
                  <Label htmlFor="precio">Precio</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={data.precio}
                    onChange={(e) => setData("precio", parseFloat(e.target.value))}
                  />
                  {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                </div>

                {/* Estado */}
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select
                    value={data.estado}
                    onValueChange={(value) => setData("estado", value as "activo" | "inactivo")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
                </div>
              </CardContent>
              <div className="flex justify-end mb-4 mr-4">
                <Button type="submit" disabled={processing}>
                  Crear Servicio
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}