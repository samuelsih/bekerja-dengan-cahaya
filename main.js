import Scene from './init';
import GUIControl from './gui';

const app = new Scene('myCanvas');
const guiControl = new GUIControl();
app.initialize();
app.animate();

// lantai
app.addGround(0xFAFAFA, -2);

// box box nya
app.addBox(0xFF0000, -2);
app.addBox(0x0000FF, 0);
app.addBox(0x00FF00, 2);

// set up ambient light
const al = app.AmbientLight(0xFFFFFF, 0.5);
guiControl.addAmbientConfig(al);

// set up directional light
const [dl, dlHelper] = app.DirectionalLight(0xFFFFFF, 0.5);
app.group.add(dlHelper);
guiControl.addDirectionalConfig(dl, dlHelper);

// set up hemisphere light
const [hl, hlHelper] = app.HemisphereLight(0xB1E1FF, 0xB97A20);
app.group.add(hlHelper)
guiControl.addHemisphereConfig(hl, hlHelper);

// set up point light
const [pl, plHelper] = app.PointLight(0xFFFFFF, 1);
app.group.add(plHelper);
guiControl.addPointConfig(pl, plHelper);

// set up rect area light
const [rectArea, rectAreaHelper] = app.RectArea(10, 10, 0xFFFFF, 3)
app.group.add(rectAreaHelper);
guiControl.addRectAreaConfig(rectArea, rectAreaHelper);
