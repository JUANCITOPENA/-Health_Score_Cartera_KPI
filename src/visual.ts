"use strict";

import powerbi from "powerbi-visuals-api";
import { VisualSettings } from "./settings";
import { valueFormatter } from "powerbi-visuals-utils-formattingutils";
import * as d3 from "d3";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

export class Visual implements IVisual {
    private target: HTMLElement;
    private host: IVisualHost;
    private settings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.host = options.host;
    }

    public update(options: VisualUpdateOptions) {
        try {
            if (!options.dataViews || !options.dataViews[0]) return;
            const dataView = options.dataViews[0];
            this.settings = VisualSettings.parse(dataView);

            if (!dataView.categorical || !dataView.categorical.values) {
                this.target.innerHTML = "";
                return;
            }

            const values = dataView.categorical.values;
            
            // 1. Datos
            let vT = 0, vC = 0, vVen = 0, vVig = 0;
            values.forEach(v => {
                const r = v.source.roles;
                const val = v.values[0] != null ? Number(v.values[0]) : 0;
                if (r['amountTotal']) vT = val;
                if (r['amountCollected']) vC = val;
                if (r['amountOverdue']) vVen = val;
                if (r['amountDue']) vVig = val;
            });

            // 2. Lógica de Coherencia 100.00% (Balanceo de Redondeo)
            const componentSum = vC + vVig + vVen;
            let pC = 0, pVig = 0, pVen = 0;
            
            if (componentSum > 0) {
                pC = Math.round((vC / componentSum) * 10000) / 10000;
                pVig = Math.round((vVig / componentSum) * 10000) / 10000;
                pVen = 1 - pC - pVig;
            }

            // 3. Diseño Gauge (Agrandado y Estilizado - 125px)
            const limitR = 0.60, limitY = 0.85;
            const radius = 125; 
            const inner = 107; // 18px de grosor
            const arcGen = d3.arc<any>().innerRadius(inner).outerRadius(radius);

            const pathBg = arcGen({ startAngle: -Math.PI/2, endAngle: Math.PI/2 });
            const pathR = arcGen({ startAngle: -Math.PI/2, endAngle: -Math.PI/2 + (limitR * Math.PI) });
            const pathY = arcGen({ startAngle: -Math.PI/2 + (limitR * Math.PI), endAngle: -Math.PI/2 + (limitY * Math.PI) });
            const pathG = arcGen({ startAngle: -Math.PI/2 + (limitY * Math.PI), endAngle: Math.PI / 2 });

            // Etiquetas fuera del arco
            const getL = (p: number, r: number) => {
                const angle = (p * Math.PI) - Math.PI; 
                return { x: 150 + r * Math.cos(angle), y: 150 + r * Math.sin(angle) };
            };
            const l0 = getL(0, 140), l60 = getL(0.6, 140), l85 = getL(0.85, 140), l100 = getL(1, 140);

            // 4. Formatos
            const fCur = valueFormatter.create({ format: "$ #,##0", cultureSelector: "en-US" });
            const fP2 = valueFormatter.create({ format: "0.00%", cultureSelector: "en-US" });
            const fP0 = valueFormatter.create({ format: "0%", cultureSelector: "en-US" });

            const colM = pC < limitR ? "#ef4444" : (pC < limitY ? "#eab308" : "#22c55e");
            const txtZ = pC < limitR ? "ZONA CRÍTICA" : (pC < limitY ? "ZONA DE RIESGO" : "ZONA SALUDABLE");
            const uid = "v" + Math.random().toString(36).substr(2, 9);
            const icon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z";

            this.target.innerHTML = `
<style>
    @keyframes mv-${uid} { from { transform: rotate(-90deg); } to { transform: rotate(${(pC*180)-90}deg); } }
    .nd-${uid} { animation: mv-${uid} 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; transform-origin: 150px 150px; }
    .crd { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; flex: 1; background: white; border-radius: 20px; padding: 15px 10px; text-align: center; border: 1px solid #f1f5f9; }
    .crd:hover { transform: translateY(-10px) scale(1.05); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border-color: #cbd5e1; }
    .lbl { font-size: 11px; font-weight: 800; fill: #94a3b8; }
    .scr { transition: 0.3s ease; cursor: default; }
    .scr:hover { transform: translateX(-50%) scale(1.1); }
</style>
<div style='font-family: Segoe UI, sans-serif; background: white; padding: 25px; border-radius: 30px; box-shadow: 0 20px 45px rgba(0,0,0,0.08); height: 100%; box-sizing: border-box; overflow: auto;'>
    <div style='text-align: center; color: #64748b; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;'>Health Score de Cartera</div>
    
    <div style='position: relative; width: 300px; height: 180px; margin: 0 auto;'>
        <svg viewBox='0 0 300 180' style='width: 100%; overflow: visible;'>
            <g transform='translate(150, 150)'>
                <path d='${pathBg}' fill='#f1f5f9' />
                <path d='${pathR}' fill='#ef4444' opacity='0.9' />
                <path d='${pathY}' fill='#eab308' opacity='0.9' />
                <path d='${pathG}' fill='#22c55e' opacity='0.9' />
            </g>
            <text x='${l0.x}' y='${l0.y}' class='lbl' text-anchor='end' dx='-5'>0%</text>
            <text x='${l60.x}' y='${l60.y}' class='lbl' text-anchor='middle' dy='-10'>60%</text>
            <text x='${l85.x}' y='${l85.y}' class='lbl' text-anchor='middle' dy='-10'>85%</text>
            <text x='${l100.x}' y='${l100.y}' class='lbl' text-anchor='start' dx='5'>100%</text>
            <g class='nd-${uid}'><circle cx='150' cy='150' r='10' fill='#1e293b'/><path d='M145 150 L150 25 L155 150 Z' fill='#1e293b'/></g>
        </svg>
        <div class='scr' style='position: absolute; top: 120px; left: 50%; transform: translateX(-50%); text-align: center; background: white; padding: 15px 25px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 140px; z-index: 10;'>
            <div style='font-size: 42px; font-weight: 900; color: ${colM}; line-height: 0.8;'>${fP0.format(pC)}</div>
            <div style='font-size: 10px; font-weight: 800; color: #64748b; margin-top: 10px;'>${txtZ}</div>
        </div>
    </div>

    <div style='text-align: center; margin: 35px 0;'>
        <div style='font-size: 32px; font-weight: 900; color: #1e293b;'>${fCur.format(vT)}</div>
        <div style='font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase;'>Total Cartera Gestionada</div>
    </div>

    <div style='display: flex; gap: 12px;'>
        <div class='crd'>
            <div style='font-size: 16px; font-weight: 800; color: #22c55e;'>${fP2.format(pC)}</div>
            <svg width='45' height='45' viewBox='0 0 24 24' style='margin: 8px auto;'><path d='${icon}' fill='#f1f5f9'/><defs><clipPath id='c1${uid}'><rect x='0' y='${24*(1-pC)}' width='24' height='24' style='transition: y 1.5s ease-in-out;'/></clipPath></defs><path d='${icon}' fill='#22c55e' clip-path='url(#c1${uid})'/></svg>
            <div style='font-size: 12px; font-weight: 800; color: #1e293b;'>${fCur.format(vC)}</div>
            <div style='font-size: 9px; color: #94a3b8; font-weight: 700; text-transform: uppercase;'>Cobrado</div>
        </div>
        <div class='crd'>
            <div style='font-size: 16px; font-weight: 800; color: #eab308;'>${fP2.format(pVig)}</div>
            <svg width='45' height='45' viewBox='0 0 24 24' style='margin: 8px auto;'><path d='${icon}' fill='#f1f5f9'/><defs><clipPath id='c2${uid}'><rect x='0' y='${24*(1-pVig)}' width='24' height='24' style='transition: y 1.5s ease-in-out;'/></clipPath></defs><path d='${icon}' fill='#eab308' clip-path='url(#c2${uid})'/></svg>
            <div style='font-size: 12px; font-weight: 800; color: #1e293b;'>${fCur.format(vVig)}</div>
            <div style='font-size: 9px; color: #94a3b8; font-weight: 700; text-transform: uppercase;'>Vigente</div>
        </div>
        <div class='crd'>
            <div style='font-size: 16px; font-weight: 800; color: #ef4444;'>${fP2.format(pVen)}</div>
            <svg width='45' height='45' viewBox='0 0 24 24' style='margin: 8px auto;'><path d='${icon}' fill='#f1f5f9'/><defs><clipPath id='c3${uid}'><rect x='0' y='${24*(1-pVen)}' width='24' height='24' style='transition: y 1.5s ease-in-out;'/></clipPath></defs><path d='${icon}' fill='#ef4444' clip-path='url(#c3${uid})'/></svg>
            <div style='font-size: 12px; font-weight: 800; color: #1e293b;'>${fCur.format(vVen)}</div>
            <div style='font-size: 9px; color: #94a3b8; font-weight: 700; text-transform: uppercase;'>Vencido</div>
        </div>
    </div>
</div>
`;
        } catch (e) { console.error(e); }
    }
    public getFormattingModel(): powerbi.visuals.FormattingModel { return null; }
}