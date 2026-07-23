import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contacto', {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      },
    });
  };

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Contáctenos
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para hacer su estadía inolvidable
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent/10 mt-1">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Dirección</h4>
                    <p className="text-muted-foreground">
                      Av. Principal 123, Ciudad<br />
                      Código Postal 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent/10 mt-1">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Teléfono</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent/10 mt-1">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">info@hoteloscedros.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent/10 mt-1">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horario</h4>
                    <p className="text-muted-foreground">
                      Check-in: 3:00 PM<br />
                      Check-out: 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-scale-in">
            <form onSubmit={submit} className="space-y-4 bg-card p-8 rounded-lg shadow-[var(--shadow-card)] relative">
              {success && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm rounded-lg animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h4 className="text-xl font-semibold text-foreground">¡Mensaje Enviado!</h4>
                  <p className="text-muted-foreground text-center mt-2 px-4">
                    Gracias por contactarnos. Le responderemos a la brevedad posible.
                  </p>
                </div>
              )}
              
              <div>
                <Input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full"
                  value={data.nombre}
                  onChange={(e) => setData("nombre", e.target.value)}
                  required
                />
                {errors.nombre && <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full"
                  value={data.telefono}
                  onChange={(e) => setData("telefono", e.target.value)}
                />
                {errors.telefono && <div className="text-red-500 text-sm mt-1">{errors.telefono}</div>}
              </div>
              <div>
                <Textarea
                  placeholder="Mensaje"
                  className="w-full min-h-[120px]"
                  value={data.mensaje}
                  onChange={(e) => setData("mensaje", e.target.value)}
                  required
                />
                {errors.mensaje && <div className="text-red-500 text-sm mt-1">{errors.mensaje}</div>}
              </div>
              <Button variant="elegant" size="lg" className="w-full" disabled={processing}>
                {processing ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
