const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('folletos/index.html', 'utf8');

// Extract body up to <script>
const bodyMatch = content.match(/<body>([\s\S]*?)<script>/);
if (!bodyMatch) {
    console.error('Could not find body content');
    process.exit(1);
}

let bodyHtml = bodyMatch[1].trim();
// Escape backticks and dollars for JS template literal
bodyHtml = bodyHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');

const tsxContent = `import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import "../../css/folletos.css";

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

    const rawHTML = \`${bodyHtml}\`;

    return (
        <div className="folletos-page">
            <Head title="Folletos - Hotel Los Cedros" />
            <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
        </div>
    );
}
`;

const dir = 'resources/js/pages/Folletos';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'Folletos.tsx'), tsxContent, 'utf8');
console.log('Folletos.tsx created successfully.');
