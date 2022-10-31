import { GUI } from "dat.gui";

export default class GUIControl {
    constructor() {
        this.gui = new GUI();
        this.ambient = undefined;
        this.directional = undefined;
        this.hemisphere = undefined;
        this.bidirectional = undefined;
        this.point = undefined;
        this.rectArea = undefined;
    }

    addAmbientConfig(al) {
        this.ambient = this.gui.addFolder('ambient light');
        const alSettings = { color: al.color.getHex() };
        this.ambient.add(al, 'visible');
        this.ambient.add(al, 'intensity', 0, 1, 0.1);
        this.ambient
          .addColor(alSettings, 'color')
          .onChange((value) => al.color.set(value));
        this.ambient.open();
    }

    addDirectionalConfig(dl, dlHelper) {
        const dlSettings = {
            visible: true,
            color: dl.color.getHex(),
        };

        this.directional = this.gui.addFolder('directional light');
        this.directional.add(dlSettings, 'visible').onChange((value) => {
            dl.visible = value;
            dlHelper.visible = value;
        });
          
        this.directional.add(dl, 'intensity', 0, 1, 0.25);
        this.directional.add(dl.position, 'y', 1, 4, 0.5);
        this.directional.add(dl, 'castShadow');
        this.directional
            .addColor(dlSettings, 'color')
            .onChange((value) => dl.color.set(value));

        this.directional.open();
    }

    addHemisphereConfig(hl, hlHelper) {
        const hlSettings = {
            visible: true,
            color: hl.color.getHex(),
          };

        this.point = this.gui.addFolder('hemisphere light');
        this.point.add(hlSettings, 'visible').onChange((value) => {
            hl.visible = value;
            hlHelper.visible = value;
        });

        this.point.add(hl, 'intensity', 0, 2, 0.25);
        this.point.add(hl.position, 'x', -2, 4, 0.5);
        this.point.add(hl.position, 'y', -2, 4, 0.5);
        this.point.add(hl.position, 'z', -2, 4, 0.5);
        this.point.add(hl, 'castShadow');
        this.point
        .addColor(hlSettings, 'color')
        .onChange((value) => hl.color.set(value));
        this.point.open();
    }

    addPointConfig(pl, plHelper) {
        const plSettings = {
            visible: true,
            color: pl.color.getHex(),
          };

        this.point = this.gui.addFolder('point light');
        this.point.add(plSettings, 'visible').onChange((value) => {
            pl.visible = value;
            plHelper.visible = value;
        });

        this.point.add(pl, 'intensity', 0, 2, 0.25);
        this.point.add(pl.position, 'x', -2, 4, 0.5);
        this.point.add(pl.position, 'y', -2, 4, 0.5);
        this.point.add(pl.position, 'z', -2, 4, 0.5);
        this.point.add(pl, 'castShadow');
        this.point
        .addColor(plSettings, 'color')
        .onChange((value) => pl.color.set(value));
        this.point.open();
    }

    addRectAreaConfig(rectArea, rectAreaHelper) {
        const rectAreaSettings = {
            visible: true,
            color: rectArea.color.getHex(),
          };

        this.point = this.gui.addFolder('rect area light');
        this.point.add(rectAreaSettings, 'visible').onChange((value) => {
            rectArea.visible = value;
            rectAreaHelper.visible = value;
        });

        this.point.add(rectArea, 'intensity', 0, 2, 0.25);
        this.point.add(rectArea.position, 'x', -2, 4, 0.5);
        this.point.add(rectArea.position, 'y', -2, 4, 0.5);
        this.point.add(rectArea.position, 'z', -2, 4, 0.5);
        this.point.add(rectArea, 'castShadow');
        this.point
        .addColor(rectAreaSettings, 'color')
        .onChange((value) => rectArea.color.set(value));
        this.point.open();
    }
}   