# Guía Definitiva de Publicación en AppSource (Power BI Visuals)
**Basada en el proyecto:** CarteraHealthMasterPro (v1.0.0.0)
**Actualización:** 09/02/2026

Esta guía documenta el proceso REAL y actualizado para publicar visuales de Power BI, superando las restricciones de cuenta y validaciones técnicas de Microsoft.

---

## FASE 1: Requisitos de Identidad (La Base)

Microsoft NO permite publicar visuales con cuentas personales (`@hotmail`, `@gmail`). 

1.  **Cuenta Profesional:** Debes poseer una cuenta de organización. Si no tienes una empresa, crea un tenant de desarrollador (ej: `nombre@tunegocio.onmicrosoft.com`).
2.  **Inscripción en Programas:**
    *   Entra a [Microsoft Partner Center](https://partner.microsoft.com/dashboard).
    *   Ve a **Configuración de la cuenta** -> **Programas**.
    *   Busca **Marketplace comercial** (Commercial Marketplace) y haz clic en **Comenzar**.
    *   *Nota:* No uses los programas de "Windows" o "Office" directamente si el objetivo es AppSource.

## FASE 2: Perfil Legal y "Publisher ID"

1.  **Información de Empresa (Manual):**
    *   Al buscar tu dirección, es probable que no aparezca en el buscador automático. 
    *   **Acción:** Haz clic en **"enter company details manually"**.
    *   Usa tu nombre legal completo como aparece en tu identificación oficial.
2.  **Publisher ID (Id. del editor):**
    *   Es el identificador único en la URL de la tienda.
    *   **Reglas:** Solo minúsculas, números y guiones (ej: `juancito-pena-vizcaino`). No uses espacios ni la letra "ñ".
3.  **Verificación (Vetting):**
    *   Tras guardar, Microsoft revisará tu identidad. Puede tardar de 2 a 5 días. No podrás publicar la oferta final hasta que este proceso esté "Aprobado".

## FASE 3: Configuración de la Oferta (Offer Setup)

1.  **Crear Oferta:** Marketplace comercial -> + Nueva oferta -> **Power BI Visual**.
2.  **Licenciamiento:**
    *   Selecciona la 3ra opción: **"My offer does not require purchase of a service and does not offer in-app purchases"**.
    *   Esto marca el visual como **Gratis**, lo cual simplifica la validación fiscal.
3.  **Certificación de Power BI:** No marques la casilla de certificación inicial. Publícalo primero como visual de comunidad y pide la certificación después para evitar rechazos estrictos en el primer intento.

## FASE 4: Contenido y Marketing (Offer Listing)

1.  **Idioma:** Agrega "Spanish" (o el idioma principal).
2.  **Descripción:** 
    *   Debe empezar con: *"This application is available only in [Idioma]"*.
    *   No abuses de adjetivos; Microsoft prefiere listas de características técnicas.
3.  **Enlaces (Sin espacios):**
    *   **Privacy Policy:** Enlace directo a GitHub (ej: `https://github.com/usuario/repo/blob/main/privacy.html`).
    *   **Support:** Enlace a la sección de *Issues* o web de soporte.
    *   **IMPORTANTE:** El portal da error si dejas un espacio accidental antes de `https://`.
4.  **Logos y Capturas:**
    *   **Logo:** 300x300 px (obligatorio).
    *   **Screenshots:** 1366x768 px (formato PNG). Sube al menos 2: una del visual solo y otra del visual dentro de un reporte con datos.

## FASE 5: Validación Técnica (El archivo .pbiviz)

Aquí es donde fallan la mayoría de los desarrolladores. Microsoft tiene 2 reglas de oro:

1.  **Versión de 4 dígitos:** 
    *   En `pbiviz.json` y `package.json`, la versión DEBE ser `1.0.0.0` (4 números). Si usas `1.0.0`, el portal te dará un error rojo.
2.  **API Actualizada:**
    *   Asegúrate de usar la versión de API que el portal te sugiera (ej: `5.10.0`).
    *   Comando para actualizar: `pbiviz update [version]`.
3.  **Generación:** Ejecuta `pbiviz package` y verifica que el archivo generado en `dist/` tenga la extensión correcta.

## FASE 6: El paquete de prueba (Reporte .pbix)

*   Es **OBLIGATORIO** subir un archivo `.pbix`.
*   Crea un reporte de Power BI Desktop.
*   Importa tu visual y conéctalo a datos (aunque sean datos falsos de Excel).
*   Guárdalo y súbelo en la pestaña **Technical Configuration**. Sin esto, Microsoft rechazará la oferta automáticamente.

## FASE 7: Disponibilidad y Envío

1.  **Mercados (Availability):**
    *   Por defecto suele estar en "0 mercados".
    *   Debes ir a la pestaña **Availability**, darle a **Edit markets** y seleccionar **"Select all"**.
2.  **Notas de Certificación:**
    *   Escribe instrucciones claras para el revisor humano.
    *   Incluye el enlace a tu código fuente en GitHub (es un requisito de transparencia).
3.  **Publish:** Haz clic en el botón y espera a que el estado cambie de "Pre-processing" a "Certification".

---
**Recuerda:** Si Microsoft rechaza el visual, lee el reporte en PDF que te envían. Normalmente es por un error de diseño (iconos pequeños) o por una URL que no carga. Corrígelo, sube la versión (ej: `1.0.0.1`) y vuelve a enviar.