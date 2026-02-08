"use strict";

import powerbi from "powerbi-visuals-api";
import DataViewObjects = powerbi.DataViewObjects;

export class VisualSettings {
    public gaugeCard: GaugeCardSettings = new GaugeCardSettings();

    public static parse(dataView: powerbi.DataView): VisualSettings {
        let settings = new VisualSettings();
        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
            return settings;
        }

        let objects = dataView.metadata.objects;
        settings.gaugeCard.arcThickness = VisualSettings.getValue<number>(objects, 'gaugeSettings', 'arcThickness', 20);
        settings.gaugeCard.thresholdWarning = VisualSettings.getValue<number>(objects, 'gaugeSettings', 'thresholdWarning', 60);
        settings.gaugeCard.animation = VisualSettings.getValue<boolean>(objects, 'gaugeSettings', 'animation', true);

        return settings;
    }

    public static getValue<T>(objects: DataViewObjects, objectName: string, propertyName: string, defaultValue: T): T {
        if (objects) {
            let object = objects[objectName];
            if (object) {
                let property: T = <T>object[propertyName];
                if (property !== undefined) {
                    return property;
                }
            }
        }
        return defaultValue;
    }
}

export class GaugeCardSettings {
    public arcThickness: number = 20;
    public thresholdWarning: number = 60;
    public animation: boolean = true;
}