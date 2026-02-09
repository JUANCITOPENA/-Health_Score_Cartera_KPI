# Guía Maestra de Publicación en AppSource: CarteraHealthMasterPro

**Versión del Proyecto:** 1.2.0 (Release Candidate)  
**Fecha de Generación:** 09/02/2026  
**Repositorio:** [GitHub - Health_Score_Cartera_KPI](https://github.com/JUANCITOPENA/-Health_Score_Cartera_KPI)  
**Archivo Binario:** `dist/CarteraHealthMaster.pbiviz`

---

## 1. Validación Técnica Preliminar (Estado Actual)

Antes de subir, hemos verificado los siguientes puntos críticos exigidos por Microsoft:

- [x] **API Version:** El proyecto usa `powerbi-visuals-api` compatible (v5.3.0 configurada).
- [x] **Librerías Externas:** Se utiliza **D3.js v5** (permitido y estándar).
- [x] **Seguridad DOM:** No se usa `eval()` ni inyección insegura de código arbitrario. El HTML se genera de forma controlada en `visual.ts`.
- [x] **Empaquetado:** El comando `pbiviz package` se ejecuta sin errores fatales.
- [x] **Idioma:** Textos fijos en **Español** (esto simplifica la validación al no requerir archivos de traducción dinámicos complejos que pueden fallar).
- [x] **Funcionalidad:**
    - Lógica de Gauge (Arcos rojo/amarillo/verde).
    - Cálculo matemático preciso (Suma 100%).
    - Tooltips y efectos visuales (Hover).

---

## 2. Preparación de Activos Gráficos (Obligatorio)

Microsoft Partner Center rechazará la solicitud si no tienes estos archivos exactos. Debes prepararlos y tenerlos en una carpeta a mano.

### A. Iconos del Visual (Dentro del paquete)
Estos ya están en tu carpeta `assets/`, pero asegúrate de que se ven bien:
*   `icon.png` (20x20 px): Icono pequeño para el panel de visualizaciones.
*   **Requisito:** Debe ser claro y legible a tamaño muy pequeño.

### B. Iconos para la Tienda (AppSource)
Debes crear/tener estos archivos externos para la ficha de la tienda:
1.  **Icono Grande:** 300 x 300 px (`.png`).
    *   *Uso:* Es el logo principal que ven los usuarios al buscar.
2.  **Capturas de Pantalla (Screenshots):**
    *   **Cantidad:** Mínimo 1, Recomendado 3-5.
    *   **Tamaño:** 1280 x 720 px (o 1366 x 768 px). Formato `.png`.
    *   **Contenido:**
        *   *Captura 1:* Vista general del Gauge mostrando la "Zona Saludable".
        *   *Captura 2:* Hover sobre una tarjeta (ej. "Vigente") mostrando el efecto visual.
        *   *Captura 3:* El visual en un dashboard completo (contexto de uso).

---

## 3. Política de Privacidad y Soporte (¡Crítico!)

AppSource **NO** permite publicar sin estos dos enlaces válidos.

1.  **Enlace de Política de Privacidad:**
    *   Como el visual no recolecta datos externos, la política es simple.
    *   **Acción:** Usa el archivo `privacy.html` incluido en tu proyecto, súbelo a tu GitHub Pages o usa el enlace directo al archivo MD del repo si Microsoft lo acepta (a veces piden una URL renderizada).
    *   *URL Sugerida:* `https://github.com/JUANCITOPENA/-Health_Score_Cartera_KPI/blob/main/privacy.html` (o configurar GitHub Pages para que sea `https://juancitopena.github.io/.../privacy.html`).

2.  **Enlace de Soporte:**
    *   Donde los usuarios reportan bugs.
    *   *URL:* `https://github.com/JUANCITOPENA/-Health_Score_Cartera_KPI/issues`

---

## 4. Proceso de Subida en Partner Center (Paso a Paso)

1.  **Acceder:** Ve a [Microsoft Partner Center](https://partner.microsoft.com/dashboard).
2.  **Crear Nueva Oferta:**
    *   Ve a **Marketplace offers** -> **Overview**.
    *   Clic en **+ New offer** -> **Power BI Visual**.
3.  **Configuración de la Oferta (Offer setup):**
    *   **Alias:** `CarteraHealthMasterPro` (Nombre interno).
    *   **Offer ID:** Debe coincidir *exactamente* con el GUID o nombre interno si ya existía una versión previa. Si es nueva, ponle un ID único.
4.  **Propiedades (Properties):**
    *   **Category:** Elige "Data Visualization" y "Analytics".
    *   **Legal:** Acepta los términos.
5.  **Listado de la Oferta (Offer listing):**
    *   **Name:** `Cartera Health Score KPI` (Este es el nombre público en la tienda).
    *   **Description:** (Usa formato Markdown/HTML simple).
        > "Visualización avanzada de KPI tipo Gauge para carteras de crédito y salud financiera. Incluye lógica de semáforo (Rojo < 60%, Amarillo < 85%, Verde > 85%), cálculo automático de porcentajes y diseño moderno con animaciones. Ideal para dashboards ejecutivos. Idioma: Español."
    *   **Search Keywords:** `KPI`, `Gauge`, `Credit`, `Risk`, `Finance`, `Cobranzas`.
    *   **Screenshots & Logos:** Sube aquí las imágenes preparadas en el paso 2.
    *   **Support & Privacy URLs:** Pega los enlaces del paso 3.
6.  **Configuración Técnica (Technical configuration):**
    *   **Subir archivo:** Aquí subes el archivo `C:\Users\User\Desktop\carteraHealthMasterPro\dist\CarteraHealthMaster.pbiviz`.
    *   **Versión:** Escribe `1.2.0.0`.
7.  **Revisar y Publicar:**
    *   El sistema validará automáticamente el paquete. Si pasa, clic en **Review and publish**.
    *   Se enviará a "Certification" (Revisión manual de Microsoft).

---

## 5. Tiempos y Certificación

*   **Validación Automática:** Inmediata tras subir.
*   **Certificación Manual:** Tarda entre 1 y 3 días hábiles.
*   **Correcciones:** Si rechazan el visual (por ejemplo, por márgenes o iconos borrosos), te enviarán un PDF con capturas del error.
    *   *Solución:* Edita el código, incrementa la versión en `pbiviz.json` (ej. 1.2.1), haz `pbiviz package` y actualiza la oferta.

## 6. Mantenimiento Futuro

Para actualizar el visual en el futuro:
1.  Modifica el código.
2.  **IMPORTANTE:** Incrementa siempre la versión en `pbiviz.json`.
3.  Genera el paquete nuevo.
4.  Ve a la misma oferta en Partner Center y actualiza la configuración técnica.

---
**Generado por:** Gemini CLI Agent  
**Para:** Ing. Juancito Peña
