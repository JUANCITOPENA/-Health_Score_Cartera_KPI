# Guía de Publicación AppSource V2 (Cuenta Individual)
**Proyecto:** CarteraHealthMasterPro
**Perfil:** Desarrollador Individual (Persona Física)
**Fecha:** 12/02/2026

---

## FASE 1: Identidad del Desarrollador Individual

A diferencia de la cuenta empresarial, la cuenta **Individual** es más rápida de validar pero requiere documentos personales claros.

1.  **Acceso al Portal:** Sigue usando tu cuenta de Microsoft Entra ID (la de `@...onmicrosoft.com`) para entrar a [Partner Center](https://partner.microsoft.com/dashboard).
2.  **Perfil Legal (Individual):**
    *   Ve a **Configuración** (engranaje) -> **Configuración de la cuenta** -> **Perfil legal**.
    *   Asegúrate de que el tipo de cuenta sea **Individual**.
    *   **Nombre Legal:** Debe coincidir EXACTAMENTE con tu documento de identidad (DNI/Pasaporte). No uses nombres comerciales aquí.
3.  **Verificación de Identidad:**
    *   Microsoft te pedirá una foto de tu identificación oficial.
    *   Asegúrate de que la dirección residencial coincida con la que pusiste en el formulario.

## FASE 2: Configuración del "Publisher ID"

1.  **Publisher ID:** Es tu firma digital en la URL.
    *   Ejemplo: `juancito-pena`.
    *   Este ID debe estar reflejado en tu archivo `pbiviz.json` si decides usarlo en el campo de autor.
2.  **Aprobación:** Hasta que el estado de "Vetting" no esté en **Aprobado** (verde), no podrás enviar el visual a revisión técnica.

## FASE 3: Preparación Técnica del Visual (PBIVIZ)

Para evitar rechazos automáticos, verifica estos 3 puntos en tu código:

1.  **Versión de 4 dígitos (Regla de Oro):**
    *   Abre `pbiviz.json`.
    *   Asegúrate de que `"version": "1.0.0.0"`. (Si ya habías intentado una vez, usa `1.0.0.1`).
2.  **API Version:** 
    *   Usa la versión `5.10.0` o superior. 
    *   Comando: `pbiviz update 5.10.0`.
3.  **Empaquetado Limpio:**
    *   Borra la carpeta `dist`.
    *   Ejecuta: `pbiviz package`.
    *   El archivo resultante `dist/carteraHealthMaster.pbiviz` es el que subirás.

## FASE 4: Documentos Obligatorios para AppSource

Incluso como individuo, Microsoft exige:

1.  **Privacy Policy (Política de Privacidad):**
    *   Usa el archivo `privacy.html` de tu repositorio.
    *   URL de ejemplo: `https://github.com/JUANCITOPENA/-Health_Score_Cartera_KPI/blob/main/privacy.html`.
2.  **Soporte:** Enlace a tu LinkedIn o sección de Issues en GitHub.
3.  **Archivo de Prueba (.pbix):**
    *   Crea un archivo de Power BI con datos de ejemplo (puedes usar el "Financial Sample" de Power BI).
    *   Coloca tu visual, configúralo para que se vea bien.
    *   Guarda el `.pbix`. Es obligatorio subirlo en la pestaña "Technical Configuration".

## FASE 5: Envío y Notas al Revisor

1.  **Marketplace comercial** -> **Power BI Visual**.
2.  **Notas de certificación:** Escribe: *"Soy un desarrollador individual. Este visual es gratuito y no requiere compras externas. Adjunto código fuente para transparencia: [URL GITHUB]"*.
3.  **Mercados:** No olvides entrar a **Availability** -> **Edit Markets** -> **Select All**.

---
**Siguiente Paso:** Vamos a verificar tu archivo `pbiviz.json` actual para asegurar que la versión y los campos de autor estén listos para la cuenta individual.