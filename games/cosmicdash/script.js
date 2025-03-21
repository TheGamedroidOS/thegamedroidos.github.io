var T3D, SFX, Game;
!(function (t) {
  t.RAD_SCALE = Math.PI / 180;
  class e {
    constructor(t, e, s) {
      (this.x = 0), (this.y = 0), (this.z = 0), this.set(t, e, s);
    }
    set(t, s, i) {
      return t instanceof e
        ? ((this.x = t.x), (this.y = t.y), (this.z = t.z), this)
        : ("number" == typeof t && (this.x = t),
          "number" == typeof s && (this.y = s),
          "number" == typeof i && (this.z = i),
          this);
    }
    max() {
      return Math.max(this.x, this.y, this.z);
    }
    add(t) {
      return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
    }
    sub(t) {
      return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
    }
    distance(t) {
      return Math.sqrt(
        (this.x - t.x) * (this.x - t.x) +
          (this.y - t.y) * (this.y - t.y) +
          (this.z - t.z) * (this.z - t.z)
      );
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    cross(t) {
      let e = this.x,
        s = this.y,
        i = this.z,
        n = t.x,
        r = t.y,
        a = t.z;
      return (
        (this.x = s * a - i * r),
        (this.y = i * n - e * a),
        (this.z = e * r - s * n),
        this
      );
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    scale(t) {
      return (
        (this.x *= t instanceof e ? t.x : t),
        (this.y *= t instanceof e ? t.y : t),
        (this.z *= t instanceof e ? t.z : t),
        this
      );
    }
    normalize() {
      var t = this.length();
      return t > 0 && this.scale(1 / t), this;
    }
    clone() {
      return new e(this.x, this.y, this.z);
    }
    invert() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
    }
    toArray() {
      return [this.x, this.y, this.z];
    }
  }
  t.Vec3 = e;
  class s {
    constructor(t) {
      this.data = t || [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    transpose() {
      const t = this.data,
        e = t[1],
        s = t[2],
        i = t[5];
      return (
        (t[1] = t[3]),
        (t[2] = t[6]),
        (t[3] = e),
        (t[5] = t[7]),
        (t[6] = s),
        (t[7] = i),
        this
      );
    }
  }
  t.Mat3 = s;
  class i {
    constructor(t) {
      this.data = t || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    clone() {
      return new i(this.data);
    }
    multiply(t) {
      const e = this.data,
        s = e[0],
        i = e[1],
        n = e[2],
        r = e[3],
        a = e[4],
        o = e[5],
        h = e[6],
        c = e[7],
        l = e[8],
        u = e[9],
        m = e[10],
        d = e[11],
        f = e[12],
        p = e[13],
        g = e[14],
        v = e[15],
        x = t[0],
        w = t[1],
        y = t[2],
        T = t[3],
        b = t[4],
        k = t[5],
        S = t[6],
        E = t[7],
        C = t[8],
        A = t[9],
        z = t[10],
        D = t[11],
        M = t[12],
        F = t[13],
        R = t[14],
        N = t[15];
      return (
        (this.data = [
          s * x + i * b + n * C + r * M,
          s * w + i * k + n * A + r * F,
          s * y + i * S + n * z + r * R,
          s * T + i * E + n * D + r * N,
          a * x + o * b + h * C + c * M,
          a * w + o * k + h * A + c * F,
          a * y + o * S + h * z + c * R,
          a * T + o * E + h * D + c * N,
          l * x + u * b + m * C + d * M,
          l * w + u * k + m * A + d * F,
          l * y + u * S + m * z + d * R,
          l * T + u * E + m * D + d * N,
          f * x + p * b + g * C + v * M,
          f * w + p * k + g * A + v * F,
          f * y + p * S + g * z + v * R,
          f * T + p * E + g * D + v * N,
        ]),
        this
      );
    }
    scale(t) {
      return this.multiply([
        t.x,
        0,
        0,
        0,
        0,
        t.y,
        0,
        0,
        0,
        0,
        t.z,
        0,
        0,
        0,
        0,
        1,
      ]);
    }
    translate(t) {
      return this.multiply([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        t.x,
        t.y,
        t.z,
        1,
      ]);
    }
    rotateX(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.multiply([1, 0, 0, 0, 0, e, s, 0, 0, -s, e, 0, 0, 0, 0, 1]);
    }
    rotateY(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.multiply([e, 0, -s, 0, 0, 1, 0, 0, s, 0, e, 0, 0, 0, 0, 1]);
    }
    rotateZ(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return this.multiply([e, s, 0, 0, -s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    rotate(t) {
      return this.rotateX(t.x).rotateY(t.y).rotateZ(t.z);
    }
    perspective(t, e, s, i) {
      const n = Math.tan(0.5 * Math.PI - 0.5 * t),
        r = 1 / (s - i);
      return this.multiply([
        n / e,
        0,
        0,
        0,
        0,
        n,
        0,
        0,
        0,
        0,
        (s + i) * r,
        -1,
        0,
        0,
        s * i * r * 2,
        0,
      ]);
    }
    invert() {
      const t = this.data,
        e = t[0],
        i = t[1],
        n = t[2],
        r = t[4],
        a = t[5],
        o = t[6],
        h = t[8],
        c = t[9],
        l = t[10],
        u = l * a - o * c,
        m = -l * r + o * h,
        d = c * r - a * h,
        f = e * u + i * m + n * d;
      if (!f) return null;
      const p = 1 / f;
      return new s([
        u * p,
        (-l * i + n * c) * p,
        (o * i - n * a) * p,
        m * p,
        (l * e - n * h) * p,
        (-o * e + n * r) * p,
        d * p,
        (-c * e + i * h) * p,
        (a * e - i * r) * p,
      ]);
    }
  }
  t.Mat4 = i;
  class n {
    constructor(t, e) {
      (this.transform = t), (this.scale = e || t.scale);
    }
    getTranslate() {
      let t = this.transform.translate.clone(),
        e = this.transform.parent;
      for (; e; ) t.scale(e.scale).add(e.translate), (e = e.parent);
      return t;
    }
    getScale() {
      let t = this.scale.clone().scale(0.5),
        e = this.transform.parent;
      for (; e; ) t.scale(e.scale), (e = e.parent);
      return t;
    }
  }
  t.Collider = n;
  t.Sphere = class extends n {
    intersect(t) {
      let e = null,
        s = this.getTranslate(),
        i = t.getTranslate(),
        n = s.distance(i),
        r = this.getScale().max() + t.getScale().max();
      return (
        n < r &&
          (e = i
            .sub(s)
            .normalize()
            .scale(r - n)),
        e
      );
    }
  };
  t.Box = class extends n {
    intersect(t) {
      let s = this.getTranslate(),
        i = this.getScale(),
        n = t.getTranslate(),
        r = t.getScale().max(),
        a = new e(
          Math.max(s.x - i.x, Math.min(n.x, s.x + i.x)),
          Math.max(s.y - i.y, Math.min(n.y, s.y + i.y)),
          Math.max(s.z - i.z, Math.min(n.z, s.z + i.z))
        ),
        o = a.distance(n),
        h = null;
      return (
        o < r &&
          (h = n
            .sub(a)
            .normalize()
            .scale(r - o)),
        h
      );
    }
  };
  class r {
    constructor(t = []) {
      (this.translate = new e(t[0] || 0, t[1] || 0, t[2] || 0)),
        (this.rotate = new e(t[3] || 0, t[4] || 0, t[5] || 0)),
        (this.scale = new e(t[6] || 1, t[7] || 1, t[8] || 1));
    }
    matrix(e) {
      return (
        (e = e || new i())
          .scale(this.scale)
          .rotate(this.rotate.clone().scale(t.RAD_SCALE))
          .translate(this.translate),
        this.parent ? this.parent.matrix(e) : e
      );
    }
  }
  t.Transform = r;
  t.Camera = class {
    constructor(t = 1, s = 45, i = 0.1, n = 100) {
      (this.rotate = new e()),
        (this.position = new e()),
        (this.fov = s),
        (this.aspect = t),
        (this.near = i),
        (this.far = n);
    }
    transform(t) {
      return t
        .matrix()
        .rotate(this.rotate.clone().invert())
        .translate(this.position.clone().invert());
    }
    perspective() {
      return new i().perspective(this.fov, this.aspect, this.near, this.far);
    }
  };
  class a extends e {
    constructor() {
      super(...arguments), (this.faces = []);
    }
    addFace(t) {
      return this.faces.push(t), this;
    }
  }
  class o {
    constructor(t, e, s) {
      (this.verts = []),
        (this.normals = []),
        t.addFace(this),
        e.addFace(this),
        s.addFace(this),
        this.verts.push(t, e, s),
        (this.normal = e.clone().sub(t).cross(s.clone().sub(t)).normalize());
    }
    calcNormals(t) {
      return (
        this.verts.forEach((e, s) => {
          let i;
          e.faces.forEach((e) => {
            this.normal.dot(e.normal) > t &&
              (i = i ? i.add(e.normal) : e.normal.clone());
          }),
            this.normals.push(i ? i.normalize() : this.normal);
        }),
        this
      );
    }
    pushVerts(t) {
      return (
        this.verts.forEach((e) => {
          t.push(...e.toArray());
        }),
        this
      );
    }
    pushNormals(t) {
      return (
        this.normals.forEach((e) => {
          t.push(...e.toArray());
        }),
        this
      );
    }
  }
  t.Mesh = class {
    constructor(e, s, i = [], n = 0, r = 360) {
      if (s < 2) return;
      i.length < 2 &&
        (i = this.sphere(i.length > 0 ? i[0] + 2 : Math.ceil(s / 2) + 1));
      const a = this.createVerts(s, i, 0, r),
        o = this.createFaces(a, s, i.length / 2),
        h = Math.cos(n * t.RAD_SCALE),
        c = [],
        l = [];
      o.forEach((t) => {
        t.calcNormals(h).pushVerts(c).pushNormals(l);
      }),
        (this.verts = e.createBuffer()),
        e.bindBuffer(e.ARRAY_BUFFER, this.verts),
        e.bufferData(e.ARRAY_BUFFER, new Float32Array(c), e.STATIC_DRAW),
        (this.normals = e.createBuffer()),
        e.bindBuffer(e.ARRAY_BUFFER, this.normals),
        e.bufferData(e.ARRAY_BUFFER, new Float32Array(l), e.STATIC_DRAW),
        (this.length = c.length / 3);
    }
    sphere(t) {
      const e = [];
      if (t < 3) return;
      let s = Math.PI / (t - 1);
      for (let i = 1; i < t - 1; i++) {
        let t = s * i;
        e.push(Math.sin(t) / 2), e.push(Math.cos(t) / 2);
      }
      return e;
    }
    createVerts(e, s, i, n) {
      i *= t.RAD_SCALE;
      let r = [],
        o = ((n *= t.RAD_SCALE) - i) / e;
      r.push(new a(0, 0.5, 0)), r.push(new a(0, -0.5, 0));
      for (let t = 0; t < e; t++) {
        let e = o * t + i,
          n = Math.cos(e),
          h = Math.sin(e);
        for (let t = 0; t < s.length; t += 2) {
          let e = new a(n, 0, h);
          (e.scale(s[t]).y = s[t + 1]), r.push(e);
        }
      }
      return r;
    }
    createFaces(t, e, s) {
      const i = [];
      let n;
      for (let r = 1; r < e; ++r) {
        (n = r * s + 2),
          i.push(new o(t[0], t[n], t[n - s])),
          i.push(new o(t[1], t[n - 1], t[n + s - 1]));
        for (let e = 0; e < s - 1; e++) {
          let r = n + e;
          i.push(new o(t[r + 1], t[r - s], t[r])),
            i.push(new o(t[r - s + 1], t[r - s], t[r + 1]));
        }
      }
      i.push(new o(t[0], t[2], t[n])),
        i.push(new o(t[1], t[n + s - 1], t[s + 1]));
      for (let e = 0; e < s - 1; e++) {
        let s = n + e;
        i.push(new o(t[e + 3], t[s], t[e + 2])),
          i.push(new o(t[s + 1], t[s], t[e + 3]));
      }
      return i;
    }
  };
  t.Item = class {
    constructor(t, e, s) {
      (this.childs = []),
        (this.active = !0),
        (this.stroke = 0),
        (this.mesh = t),
        (this.color = e),
        (this.transform = new r(s));
    }
    add(t) {
      return this.childs.push(t), (t.transform.parent = this.transform), this;
    }
  };
  t.Shader = class {
    constructor(t, e, s) {
      (this.attribs = {}),
        (this.location = {}),
        (this.gl = t),
        (this.program = t.createProgram()),
        (this.indices = t.createBuffer());
      const i = this.program;
      t.attachShader(i, this.create(t.VERTEX_SHADER, e)),
        t.attachShader(i, this.create(t.FRAGMENT_SHADER, s)),
        t.linkProgram(i),
        t.getProgramParameter(i, t.LINK_STATUS) ||
          (console.log(t.getProgramInfoLog(i)), t.deleteProgram(i));
    }
    create(t, e) {
      const s = this.gl,
        i = s.createShader(t);
      return (
        s.shaderSource(i, e),
        s.compileShader(i),
        s.getShaderParameter(i, s.COMPILE_STATUS) ||
          console.log(s.getShaderInfoLog(i)),
        i
      );
    }
    attrib(t, e, s) {
      const i = this.gl;
      this.location[t] ||
        (this.location[t] = i.getAttribLocation(this.program, t));
      const n = this.location[t];
      return (
        i.bindBuffer(i.ARRAY_BUFFER, e),
        i.enableVertexAttribArray(n),
        i.vertexAttribPointer(n, s, i.FLOAT, !1, 0, 0),
        this
      );
    }
    uniform(t, e) {
      const s = this.gl;
      this.location[t] ||
        (this.location[t] = s.getUniformLocation(this.program, t));
      const i = this.location[t];
      if ("number" == typeof e) return s.uniform1f(i, e), this;
      switch (e.length) {
        case 2:
          s.uniform2fv(i, e);
          break;
        case 3:
          s.uniform3fv(i, e);
          break;
        case 4:
          s.uniform4fv(i, e);
          break;
        case 9:
          s.uniformMatrix3fv(i, !1, e);
          break;
        case 16:
          s.uniformMatrix4fv(i, !1, e);
      }
      return this;
    }
  };
})(T3D || (T3D = {})),
  (function (t) {
    (window.AudioContext = window.AudioContext || window.webkitAudioContext),
      (window.OfflineAudioContext =
        window.OfflineAudioContext || window.webkitOfflineAudioContext);
    const e = 44100,
      s = {
        c: 0,
        db: 1,
        d: 2,
        eb: 3,
        e: 4,
        f: 5,
        gb: 6,
        g: 7,
        ab: 8,
        a: 9,
        bb: 10,
        b: 11,
      },
      i = [],
      n = new AudioContext(),
      r = (new OfflineAudioContext(1, 2 * e, e), {}),
      a = {};
    let o, h;
    t.Sound = class {
      constructor(t, e, s) {
        (this.type = t), (this.curve = Float32Array.from(e)), (this.length = s);
      }
      time(t) {
        return (t < this.length ? t : this.length) - 0.01;
      }
      async render(t, s, i) {
        let n = new OfflineAudioContext(1, e * i, e),
          r = n.createGain(),
          h = Float32Array.from(s);
        if (
          (r.connect(n.destination),
          this.curve && r.gain.setValueCurveAtTime(this.curve, 0, this.time(i)),
          n.addEventListener("complete", (e) => {
            a[t] = e.renderedBuffer;
          }),
          "custom" == this.type)
        ) {
          let t = n.createBufferSource(),
            e = n.createBiquadFilter();
          e.connect(r),
            e.detune.setValueCurveAtTime(h, 0, i),
            (t.buffer = o),
            (t.loop = !0),
            t.connect(e),
            t.start();
        } else {
          let t = n.createOscillator();
          (t.type = this.type),
            t.frequency.setValueCurveAtTime(h, 0, i),
            t.connect(r),
            t.start(),
            t.stop(i);
        }
        await n.startRendering();
      }
    };
    function c(t) {
      return (
        t in r || ((r[t] = n.createGain()), r[t].connect(n.destination)), r[t]
      );
    }
    (t.Channel = class {
      constructor(t, e, n) {
        (this.inst = t), (this.data = []), (this.size = 0), (this.length = 0);
        let r = e.split("|");
        if (r.length > 1) {
          e = "";
          for (let t = 0; t < r.length; t++)
            e +=
              t % 2
                ? ("," + r[t - 1]).repeat(parseInt(r[t]) - 1)
                : (e ? "," : "") + r[t];
        }
        e.split(",").forEach((t) => {
          let e = t.match(/^(\d+)/),
            r = t.match(/([a-z]+\d+)/g);
          if (e) {
            let t = n / parseInt(e[1]),
              a = [t];
            if (((this.length += t), r)) {
              r.length > this.size && (this.size = r.length);
              for (let t = 0; t < r.length; t++) {
                let e = r[t].match(/([a-z]+)(\d+)/);
                e && a.push(i[12 * parseInt(e[2]) + s[e[1]]]);
              }
            }
            this.data.push(a);
          }
        });
      }
      play(t) {
        let e = 0,
          s = this.inst,
          i = t.createGain(),
          n = [];
        i.connect(t.destination);
        for (let e = 0; e < this.size; e++)
          (n[e] = t.createOscillator()), (n[e].type = s.type), n[e].connect(i);
        this.data.forEach((t) => {
          s.curve && i.gain.setValueCurveAtTime(s.curve, e, s.time(t[0])),
            n.forEach((s, i) => {
              s.frequency.setValueAtTime(t[i + 1] || 0, e);
            }),
            (e += t[0]);
        }),
          n.forEach((t) => {
            t.start(), t.stop(e);
          });
      }
    }),
      (t.init = async function () {
        "suspended" === n.state && (await n.resume());
        let t = Math.pow(2, 1 / 12);
        for (let e = -57; e < 50; e++) i.push(440 * Math.pow(t, e));
        (o = n.createBuffer(1, 2 * e, e)), (h = o.getChannelData(0));
        for (let t = 0; t < 2 * e; t++) h[t] = 2 * Math.random() - 1;
      }),
      (t.render = async function (t, s) {
        let i = 0;
        s.forEach((t) => {
          t.length > i && (i = t.length);
        });
        const n = new OfflineAudioContext(1, e * i, e);
        n.addEventListener("complete", (e) => {
          a[t] = e.renderedBuffer;
        }),
          s.forEach((t, e) => {
            t.play(n);
          }),
          await n.startRendering();
      }),
      (t.mixer = c),
      (t.play = function (t, e = !1, s = "master") {
        if (t in a) {
          let i = n.createBufferSource();
          return (
            e && (i.loop = !0), (i.buffer = a[t]), i.connect(c(s)), i.start(), i
          );
        }
        return null;
      });
  })(SFX || (SFX = {})),
  (function (t) {
    t.Enemy = class extends T3D.Item {
      init(t) {
        (this.active = t),
          (this.stroke = 0),
          (this.explode = 0),
          this.transform.rotate.set(0, 0, 0),
          this.transform.translate.set(0, 1, 0);
      }
      update(t, e) {
        if (!this.active) return;
        if (((this.stroke += (this.explode - this.stroke) / 25), this.stroke))
          return;
        let s = this.transform.translate,
          i = this.transform.rotate;
        (s.z = e ? 0 : s.z + t / 2),
          (i.z = (i.z + 5) % 360),
          (i.x = (i.x + 3) % 360);
      }
      intersect(e) {
        if (
          this.active &&
          !this.explode &&
          !e.explode &&
          this.collider.intersect(e.collider)
        ) {
          if (e.speedTime)
            return (this.explode = 7), void t.Event.trigger("hit", e);
          (e.explode = 7), t.Event.trigger("exp", e);
        }
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    class e {
      static on(t, s) {
        const i = t.match(/[a-zA-Z]+/g);
        i &&
          i.forEach((t) => {
            t in e.listener || (e.listener[t] = []), e.listener[t].push(s);
          });
      }
      static trigger(t, s) {
        e.listener.all.forEach((e) => {
          e(t, s);
        }),
          t in e.listener &&
            e.listener[t].forEach((e) => {
              e(t, s);
            });
      }
    }
    (e.listener = { all: [] }), (t.Event = e);
  })(Game || (Game = {})),
  (function (t) {
    t.Hero = class extends T3D.Item {
      init(e = !0) {
        const s = this.transform;
        s.translate.set(0, 0, 0),
          s.rotate.set(0, 0, 90),
          s.scale.set(1, 1, 1),
          (this.color = t.COLOR.WHITE),
          (this.active = !0),
          (this.transform = s),
          (this.collider = new T3D.Sphere(s)),
          (this.tokenCollider = new T3D.Sphere(s)),
          (this.x = 0),
          (this.rad = 0.4),
          (this.acc = -0.015),
          (this.speed = new T3D.Vec3(0, 0, 0.1)),
          (this.speedTime = 0),
          (this.scale = 0.8),
          (this.scaleTime = 0),
          (this.magnet = new T3D.Vec3(5, 5, 5)),
          (this.magnetTime = 0),
          (this.explode = 0),
          (this.stroke = 0),
          e && (this.distance = 0);
      }
      left() {
        this.x >= 0 && (this.x--, t.Event.trigger("move", this));
      }
      right() {
        this.x <= 0 && (this.x++, t.Event.trigger("move", this));
      }
      jump() {
        this.collide && ((this.acc = 0.03), t.Event.trigger("jump", this));
      }
      boost() {
        (this.speedTime = 75), t.Event.trigger("move", this);
      }
      magnetize() {
        (this.magnetTime = 450), t.Event.trigger("power", this);
      }
      dash() {
        (this.scaleTime = 40), t.Event.trigger("move", this);
      }
      coin() {
        t.Event.trigger("coin", this);
      }
      cancel() {
        this.x = Math.round(this.transform.translate.x);
      }
      update() {
        let e = this.transform.translate,
          s = this.scale,
          i = this.transform.rotate,
          n =
            (this.speedTime ? 0.13 : 0.08) +
            Math.min(this.distance / 15e3, 0.04);
        (this.speed.z += ((this.active ? n : 0) - this.speed.z) / 20),
          (this.speedTime -= this.speedTime > 0 ? 1 : 0),
          (this.color =
            this.magnetTime > 100 || this.magnetTime % 20 > 10
              ? t.COLOR.PINK
              : t.COLOR.WHITE),
          (this.scale += ((this.scaleTime ? 0.5 : 0.7) - this.scale) / 5),
          (this.scaleTime -= this.scaleTime > 0 ? 1 : 0),
          (this.magnetTime -= this.magnetTime > 0 ? 1 : 0),
          (this.tokenCollider.scale = this.magnetTime
            ? this.magnet
            : this.transform.scale),
          (this.stroke += (this.explode - this.stroke) / 25),
          (this.active = e.y > -10 && this.stroke < 6),
          this.active &&
            !this.stroke &&
            ((this.acc -= this.acc > -0.012 ? 0.003 : 0),
            (i.z = 90 + 25 * (e.x - this.x)),
            (i.y = (i.y + 100 * this.speed.z) % 360),
            (this.speed.y += this.acc),
            this.speed.y < -0.25 && (this.speed.y = -0.25),
            (e.x += (this.x - e.x) / 7),
            (e.y += this.speed.y),
            (e.z -= e.z / 30),
            this.transform.scale.set(s, s, s));
      }
      preview() {
        let t = this.transform.rotate;
        (t.y = (t.y + 1) % 360), (t.z = (t.z + 0.7) % 360);
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    t.Map = class {
      constructor(t, e = 7, s = 150) {
        (this.config = t.split("|")), (this.length = e), (this.steps = s);
      }
      init() {
        (this.row = [1, 1, 1]),
          (this.count = 10),
          (this.data = []),
          (this.step = 0),
          (this.min = 0),
          this.update();
      }
      max() {
        let t = this.min + this.length,
          e = this.config.length;
        return t < e ? t : e - 1;
      }
      update() {
        let e = !1;
        if (
          (++this.step > this.steps &&
            ((e = !0),
            (this.step = 0),
            this.min + this.length < this.config.length - 1 && this.min++),
          --this.count > 0)
        )
          return e;
        if (!this.data.length) {
          this.mirror = t.Rand.get() > 0.5;
          let e = t.Rand.get(this.max(), this.min, !0);
          this.data = this.config[e].match(/.{1,4}/g);
        }
        return (
          (this.row = this.data
            .shift()
            .split("")
            .map((t) => parseInt(t, 36))),
          (this.count = this.row.shift()),
          this.mirror && this.row.reverse(),
          e
        );
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    const e = "offliner_hi";
    t.Menu = class {
      constructor() {
        let s = JSON.parse(window.localStorage.getItem(e));
        (this.body = t.$("body")),
          (this.btn = t.$("#play")),
          (this.info = document.getElementsByTagName("H3")),
          (this.shop = !0),
          (this.active = !0),
          (this.storage =
            s && "object" == typeof s && "shop" in s
              ? s
              : { score: 0, token: 0, level: 0, shop: [0] }),
          (this.selected = 0),
          (this.heroes = [
            { name: "SPUTNIK", price: 0 },
            { name: "VOYAGER", price: 500 },
            { name: "PIONEER", price: 1e3 },
            { name: "CASSINI", price: 2500 },
          ]),
          (this.tasklist = document.getElementsByTagName("H4")),
          (this.scores = document.getElementsByTagName("TD")),
          (this.stats = {}),
          (this.sfxBtn = t.$("#sfx")),
          (this.volume = 0.3),
          this.hero(),
          this.bind(),
          this.init();
      }
      level() {
        return this.storage.level + 1;
      }
      init() {
        let e = this.level(),
          s = [],
          i = Math.ceil(e / 3);
        switch (e % 3) {
          case 1:
            s.push(new t.Task("coin", 75 * i));
            break;
          case 2:
            s.push(new t.Task("power", i, i % 2 == 0));
            break;
          default:
            s.push(new t.Task("coin", 50 * i, !0));
        }
        switch (((i = Math.ceil(e / 4)), e % 4)) {
          case 1:
            s.push(i < 8 ? new t.Task("planet", i) : new t.Task("hit", i, !0));
            break;
          case 2:
            s.push(
              i % 2 == 1
                ? new t.Task("fence", 5 * i)
                : new t.Task("fence", 3 * i, !0)
            );
            break;
          case 3:
            s.push(
              i % 2 == 1
                ? new t.Task("enemy", 3 * i)
                : new t.Task("enemy", 2 * i, !0)
            );
            break;
          default:
            s.push(new t.Task("hit", i));
        }
        this.tasks = s;
      }
      bind() {
        t.on(t.$("#ok"), "click", () => {
          t.Event.trigger("end");
        }),
          t.on(this.btn, "click", () => {
            this.play();
          }),
          t.on(t.$("#prev"), "click", () => {
            this.prev();
          }),
          t.on(t.$("#next"), "click", () => {
            this.next();
          }),
          t.on(this.sfxBtn, "click", () => {
            let t = this.sfxBtn,
              e = SFX.mixer("music"),
              s = SFX.mixer("master"),
              i = s.context.currentTime;
            try {
              switch (t.className) {
                case "no":
                  (this.volume = 0.3),
                    e.gain.setValueAtTime(this.volume, i),
                    s.gain.setValueAtTime(1, i),
                    (t.className = "");
                  break;
                case "sfx":
                  s.gain.setValueAtTime(0, i), (t.className = "no");
                  break;
                default:
                  (this.volume = 0),
                    e.gain.setValueAtTime(this.volume, i),
                    (t.className = "sfx");
              }
            } catch (t) {}
          }),
          t.Event.on("all", (t) => {
            t in this.stats ? (this.stats[t] += 1) : (this.stats[t] = 1),
              this.tasks.forEach((e) => {
                e.on(t);
              });
          });
      }
      input(e) {
        if (this.active)
          switch (e) {
            case 32:
              this.shop ? this.play() : t.Event.trigger("end");
              break;
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
          }
      }
      play() {
        "PLAY" == this.btn.textContent
          ? ((this.stats = {}), t.Event.trigger("start"))
          : "" == this.btn.className &&
            ((this.storage.token -= this.heroes[this.selected].price),
            this.storage.shop.push(this.selected),
            this.store(),
            this.hero());
      }
      hero() {
        let t = this.storage.token,
          e = this.heroes[this.selected],
          s = this.storage.shop.indexOf(this.selected) < 0,
          i = t >= e.price;
        (this.info.item(0).textContent = e.name),
          (this.info.item(1).textContent = s ? `₮ ${e.price} / ${t}` : ""),
          (this.btn.textContent = s ? "BUY" : "PLAY"),
          (this.btn.className = !s || i ? "" : "disabled");
      }
      prev() {
        --this.selected < 0 && (this.selected = this.heroes.length - 1),
          this.hero();
      }
      next() {
        ++this.selected >= this.heroes.length && (this.selected = 0),
          this.hero();
      }
      store() {
        window.localStorage.setItem(e, JSON.stringify(this.storage));
      }
      mission(t = !1) {
        let e = !0;
        return (
          this.tasks.forEach((s, i) => {
            t || s.init();
            let n = this.tasklist.item(i + 1);
            (n.textContent = s.toString()),
              (n.className = s.done ? "done" : ""),
              (e = e && s.done);
          }),
          e && (this.storage.level++, this.store(), this.init()),
          e
        );
      }
      score(t) {
        let e = this.storage.score || 0,
          s = this.tasklist.item(0),
          i = this.scores,
          n = this.stats.hit || 0,
          r = (this.stats.planet || 0) + 1,
          a = this.stats.power || 0,
          o = this.stats.coin || 0,
          h = Math.round(t.distance),
          c = this.mission(!0) ? 1 : 0;
        (i.item(0).textContent = h + ""),
          (i.item(1).textContent = "₮ " + o + " x 10"),
          (i.item(2).textContent = a + " x 25"),
          (i.item(3).textContent = n + " x 50"),
          (i.item(4).textContent = r + " x 100"),
          (i.item(5).textContent = c + " x 500"),
          (h += 500 * c + 100 * r + 50 * n + 25 * a + 10 * o),
          (i.item(6).textContent = h + ""),
          e < h
            ? ((s.textContent = "NEW HIGH SCORE"), (this.storage.score = h))
            : (s.textContent = "SCORE"),
          (this.storage.token += o),
          this.store(),
          (this.active = !0),
          (this.body.className = "end");
      }
      show() {
        (this.shop = !0), (this.body.className = "");
      }
      hide() {
        (this.shop = !1),
          (this.active = !1),
          this.mission(),
          (this.tasklist.item(0).textContent = "MISSION " + this.level()),
          (this.scores.item(4).textContent = this.scores.item(5).textContent =
            ""),
          (this.body.className = "play");
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    t.Platform = class extends T3D.Item {
      update(t) {
        let e = this.transform.translate;
        e.z += t;
        let s = e.z > 2;
        s && (e.z -= 11);
        let i = 1;
        return (
          e.z < -8 ? (i = e.z + 9) : e.z > 1 && (i = 2 - e.z),
          this.transform.scale.set(i, i, i),
          this.token.update(),
          this.enemy.update(t, s),
          s
        );
      }
      intersect(t, e = !1) {
        if (!t.active || t.stroke) return;
        let s,
          i = this.fence;
        return (
          this.token.intersect(t),
          i.active &&
            (s = i.collider.intersect(t.collider)) &&
            (e && s.x && t.cancel(),
            t.transform.translate.add(s),
            (t.speed.y += s.y)),
          this.block.active
            ? ((s = this.block.collider.intersect(t.collider)) &&
                (e && s.x && t.cancel(),
                t.transform.translate.add(s),
                (t.speed.y += s.y)),
              s)
            : void 0
        );
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    t.Scene = class extends T3D.Item {
      constructor(t, e, s) {
        super(),
          (this.map = s),
          (this.hero = t),
          this.add(this.hero),
          (this.planets = document.getElementsByTagName("LI")),
          (this.platforms = []);
        for (let t = 0; t < 33; t++) {
          let t = e();
          this.platforms.push(t), this.add(t);
        }
        this.init();
      }
      init() {
        (this.row = 9), this.hero.init(), this.map.init();
        let t = 0;
        for (let e = -9; e < 2; e++)
          for (let s = -1; s <= 1; s++) {
            let i = this.platforms[t++];
            i.transform.translate.set(s, -1, e),
              (i.enemy.active = i.fence.active = i.token.active = !1),
              (i.block.active = !0);
          }
        for (
          this.planet = this.planets.length - 1, t = 0;
          t < this.planets.length;
          t++
        )
          this.planets.item(t).className = "";
      }
      next() {
        this.planet > 0 &&
          ((this.planets.item(this.planet--).className = "hide"),
          t.Event.trigger("planet", this.planet));
      }
      ended() {
        return Math.abs(this.hero.speed.z) < 0.01;
      }
      input(t) {
        const e = this.hero;
        switch (t) {
          case 37:
            e.left();
            break;
          case 39:
            e.right();
            break;
          case 38:
            e.jump();
            break;
          case 40:
            e.dash();
            break;
          case 32:
            e.boost();
        }
      }
      updateRow(t) {
        (this.row -= t),
          this.row <= -0.5 && (this.row += 11),
          (this.index =
            3 * Math.round(this.row) +
            Math.round(this.hero.transform.translate.x) +
            1);
      }
      getIndex(t = 0) {
        let e = this.platforms.length,
          s = this.index + t;
        return s < 0 ? s + e : s >= e ? s - e : s;
      }
      update() {
        this.hero.update();
        let e = !1,
          s = this.hero,
          i = s.speed.z,
          n = 0,
          r = 0;
        this.platforms.forEach((t, a) => {
          if (t.update(i)) {
            (n += t.fence.active && s.transform.translate.y > -1 ? 1 : 0),
              (r += !t.enemy.active || t.enemy.stroke || s.stroke ? 0 : 1);
            let i = this.map.row[a % 3],
              o = i >> 2;
            (t.block.active = (1 & i) > 0),
              (t.transform.translate.y = (2 & i) > 0 ? 0 : -1),
              t.token.init(1 == o || 4 == o),
              (t.fence.active = 2 == o),
              t.enemy.init(3 == o),
              (t.token.transform.rotate.y = 45),
              (e = !0);
          }
          t.enemy.intersect(s);
        }),
          e && this.map.update() && this.next(),
          this.updateRow(i),
          (s.collide = this.platforms[this.getIndex()].intersect(s)),
          [-3, 3, -1, 1, -2, 2, -4, 4].forEach((t) => {
            let e = this.getIndex(t);
            this.platforms[e].intersect(s, 1 == t || -1 == t);
          }),
          (s.distance += i),
          n > 0 && t.Event.trigger("fence", n),
          r > 0 && t.Event.trigger("enemy", r);
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    const e = {
        coin: "Collect $ token",
        power: "Collect $ big token",
        planet: "Travel to $",
        fence: "Dodge junks $ time",
        enemy: "Dodge asteroids $ time",
        hit: "Destroy $ asteroid",
      },
      s = ["Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Space"];
    t.Task = class {
      constructor(t, e, s = !1) {
        (this.event = t),
          (this.target = e),
          (this.count = 0),
          (this.run = s || "planet" == t),
          (this.done = !1);
      }
      init() {
        !this.done && this.run && (this.count = 0);
      }
      on(t) {
        this.done ||
          this.event != t ||
          (this.done = this.target <= ++this.count);
      }
      toString() {
        let t = this.event,
          i = e[t],
          n = this.target.toString();
        return (
          "planet" == t
            ? (n = s[this.target - 1])
            : (this.target > 1 && (i += "s"),
              this.run && (i += " on a mission"),
              !this.done && this.count && (n += " / " + this.count)),
          i.replace("$", n)
        );
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    const e = [1, 1, 0.3, 30],
      s = [1, 0.3, 1, 30];
    t.Token = class extends T3D.Item {
      constructor() {
        super(...arguments), (this.big = !1);
      }
      init(e) {
        (this.active = e),
          this.transform.translate.set(0, 1, 0),
          (this.big = !t.Rand.get(50, 0, !0)),
          (this.speed = 0.01);
      }
      score() {
        return this.big ? 5 : 1;
      }
      update() {
        let t = this.transform.rotate,
          i = this.transform.scale;
        (t.y = (t.y + 1.5) % 360),
          this.big
            ? (i.set(0.7, 0.15, 0.7), (this.color = s))
            : (i.set(0.5, 0.1, 0.5), (this.color = e));
      }
      intersect(t) {
        let e = this.big ? t.collider : t.tokenCollider;
        if (this.active && this.collider.intersect(e)) {
          let e = this.collider.getTranslate();
          if (e.distance(t.transform.translate) < 0.5)
            return (
              (this.active = !1), void (this.big ? t.magnetize() : t.coin())
            );
          (this.speed += this.speed),
            this.transform.translate.add(
              t.transform.translate.clone().sub(e).scale(this.speed)
            );
        }
      }
    };
  })(Game || (Game = {})),
  (function (t) {
    function e(t, e) {
      return (e || document).querySelector(t);
    }
    function s(t, e, s, i = !1) {
      t.addEventListener(e, s, i);
    }
    (t.$ = e), (t.on = s);
    class i {
      static get(t = 1, e = 0, s = !0) {
        if (t <= e) return t;
        i.seed = (9301 * i.seed + 49297) % 233280;
        let n = e + (i.seed / 233280) * (t - e);
        return s ? Math.round(n) : n;
      }
    }
    (i.seed = Math.random()),
      (t.Rand = i),
      (t.COLOR = {
        WHITE: [1, 1, 1, 10],
        PINK: [1, 0.3, 1, 30],
        BLUE: [0.3, 0.3, 1, 30],
        YELLOW: [1, 1, 0.3, 30],
        RED: [1, 0.3, 0.3, 0],
        CYAN: [0.3, 1, 1, 30],
      });
    let n,
      r = !1,
      a = e("#game"),
      o = new t.Menu(),
      h = new Date().getTime(),
      c = a.getContext("webgl"),
      l = new T3D.Vec3(5, 15, 7),
      u = new T3D.Camera(a.width / a.height),
      m = new T3D.Shader(
        c,
        "precision mediump float;attribute vec3 aPos, aNorm;uniform mat4 uWorld, uProj;uniform mat3 uInverse;uniform float uStroke;varying vec4 vPos;varying vec3 vNorm;void main(void) {vec3 pos = aPos + (aNorm * uStroke);vPos = uWorld * vec4(pos, 1.0);vNorm = uInverse * aNorm;gl_Position = uProj * vPos;}",
        "precision mediump float;uniform mat4 uWorld;uniform vec4 uColor;uniform vec3 uLight;uniform float uLevels;varying vec4 vPos;varying vec3 vNorm;vec3 uAmbient = vec3(.2, .2, .2);vec3 uDiffuse = vec3(.8, .8, .8);vec3 uSpecular = vec3(.8, .8, .8);void main(void) {vec3 lightDir = normalize(uLight - vPos.xyz);vec3 normal = normalize(vNorm);vec3 eyeDir = normalize(-vPos.xyz);vec3 reflectionDir = reflect(-lightDir, normal);float specularWeight = 0.0;if (uColor.w > 0.0) { specularWeight = pow(max(dot(reflectionDir, eyeDir), 0.0), uColor.w); }float diffuseWeight = max(dot(normal, lightDir), 0.0);vec3 weight = uAmbient + uSpecular * specularWeight  + uDiffuse * diffuseWeight;vec3 color = uColor.xyz * weight;if (uLevels > 1.0) { color = floor(color * uLevels) * (1.0 / uLevels); }gl_FragColor = vec4(color, 1);}"
      ),
      d = {
        hero: [
          new T3D.Mesh(c, 10),
          new T3D.Mesh(c, 10, [0.5, 0.15, 0.5, 0.1, 0.5, -0.1, 0.5, -0.15]),
          new T3D.Mesh(
            c,
            10,
            [
              0.2, 0.5, 0.48, 0.2, 0.5, 0.1, 0.2, 0.1, 0.2, -0.1, 0.5, -0.1,
              0.48, -0.2, 0.2, -0.5,
            ]
          ),
          new T3D.Mesh(
            c,
            10,
            [
              0.3, 0.44, 0.43, 0.3, 0.45, 0.2, 0.49, 0.2, 0.5, 0.1, 0.45, 0.1,
              0.45, -0.1, 0.5, -0.1, 0.49, -0.2, 0.45, -0.2, 0.43, -0.3, 0.3,
              -0.44,
            ]
          ),
        ],
        block: new T3D.Mesh(
          c,
          4,
          [0.55, 0.5, 0.65, 0.4, 0.65, -0.4, 0.55, -0.5]
        ),
        fence: new T3D.Mesh(
          c,
          12,
          [0.4, 0.5, 0.5, 0.4, 0.5, -0.4, 0.4, -0.5],
          40
        ),
        token: new T3D.Mesh(
          c,
          9,
          [0.45, 0.3, 0.45, 0.5, 0.5, 0.5, 0.5, -0.5, 0.45, -0.5, 0.45, -0.3],
          30
        ),
        enemy: new T3D.Mesh(c, 6),
      },
      f = new t.Hero(d.hero[0], t.COLOR.WHITE),
      p = new t.Scene(
        f,
        () => {
          let e = new t.Platform(),
            s = new T3D.Item(d.block, t.COLOR.BLUE, [, , , , 45]),
            i = new t.Enemy(d.enemy, t.COLOR.CYAN, [
              ,
              1,
              ,
              ,
              ,
              ,
              0.7,
              0.7,
              0.7,
            ]),
            n = new t.Token(d.token, t.COLOR.YELLOW, [
              ,
              1,
              ,
              90,
              ,
              ,
              0.5,
              0.1,
              0.5,
            ]),
            r = new T3D.Item(d.fence, t.COLOR.RED, [
              ,
              1.4,
              ,
              ,
              ,
              ,
              0.8,
              1,
              0.8,
            ]);
          return (
            (s.collider = new T3D.Box(s.transform)),
            (i.collider = new T3D.Sphere(i.transform)),
            (n.collider = new T3D.Sphere(n.transform)),
            (r.collider = new T3D.Box(r.transform)),
            (e.block = s),
            (e.token = n),
            (e.fence = r),
            (e.enemy = i),
            e.add(s).add(n).add(r).add(i)
          );
        },
        new t.Map(
          "311737173711|4111|5711|3111|211135012111|2111|301531513510|311119973111|5111111d|311120003115|551111dd|305130053051|3111139b3511|211130002115|401510004510"
        )
      );
    function g() {
      (a.width = a.clientWidth),
        (a.height = a.clientHeight),
        (u.aspect = a.width / a.height),
        c.viewport(0, 0, a.width, a.height);
    }
    function v(t, e = 0) {
      if (
        (t.childs.forEach((t) => {
          v(t, e);
        }),
        !t.active || !t.mesh)
      )
        return;
      let s = t.transform.matrix().invert();
      s &&
        (c.cullFace(e > 0 ? c.FRONT : c.BACK),
        c.useProgram(m.program),
        m
          .attrib("aPos", t.mesh.verts, 3)
          .attrib("aNorm", t.mesh.normals, 3)
          .uniform("uWorld", u.transform(t.transform).data)
          .uniform("uProj", u.perspective().data)
          .uniform("uInverse", s.transpose().data)
          .uniform("uColor", e ? [0, 0, 0, 1] : t.color)
          .uniform("uLight", l.clone().sub(u.position).toArray())
          .uniform("uStroke", e + t.stroke)
          .uniform("uLevels", e ? 0 : 5),
        c.drawArrays(c.TRIANGLES, 0, t.mesh.length));
    }
    function x() {
      if ((requestAnimationFrame(x), c.clear(c.COLOR_BUFFER_BIT), o.shop))
        return (
          (f.mesh = d.hero[o.selected]), f.preview(), v(f), void v(f, 0.02)
        );
      let t = new Date().getTime();
      if (
        (t - h > 30 && p.update(),
        (h = t),
        p.update(),
        v(p),
        v(p, 0.02),
        !f.active && n)
      ) {
        let t = SFX.mixer("music"),
          e = t.context.currentTime;
        t.gain.setValueCurveAtTime(Float32Array.from([o.volume, 0]), e, 0.5),
          n.stop(e + 0.5),
          (n = null);
      }
      !o.active && p.ended() && o.score(f);
    }
    async function w() {
      r = !0;
      let t = e("#start");
      (t.className = "disabled"),
        (t.textContent = "loading"),
        await SFX.init(),
        await Promise.all([
          new SFX.Sound("custom", [5, 1, 0], 1).render("exp", [220, 0], 1),
          new SFX.Sound("custom", [3, 1, 0], 1).render("hit", [1760, 0], 0.3),
          new SFX.Sound("square", [0.5, 0.1, 0], 1).render(
            "power",
            [440, 880, 440, 880, 440, 880, 440, 880],
            0.3
          ),
          new SFX.Sound("triangle", [0.5, 0.1, 0], 1).render(
            "jump",
            [220, 880],
            0.3
          ),
          new SFX.Sound("square", [0.2, 0.1, 0], 0.2).render(
            "coin",
            [1760, 1760],
            0.2
          ),
          new SFX.Sound("custom", [0.1, 0.5, 0], 0.3).render(
            "move",
            [1760, 440],
            0.3
          ),
          SFX.render("music", [
            new SFX.Channel(
              new SFX.Sound("sawtooth", [1, 0.3], 0.2),
              "8a2,8a2,8b2,8c3|8|8g2,8g2,8a2,8b2|8|8e2,8e2,8f2,8g2|4|8g2,8g2,8a2,8b2|4|".repeat(
                4
              ),
              1
            ),
            new SFX.Channel(
              new SFX.Sound("sawtooth", [0.5, 0.5], 1),
              "1a3,1g3,2e3,4b3,4c4,1a3c3e3,1g3b3d4,2e3g3b3,4d3g3b3,4g3c4e4|1|" +
                "8a3,8a3e4,8a3d4,8a3e4|2|8g3,8g3d4,8g3c4,8g3d4|2|8e3,8e3a3,8e3b3,8e3a3,4g3b3,4g3c4|1|".repeat(
                  2
                ),
              4
            ),
          ]),
        ]),
        (e("#load").className = "hide"),
        x();
    }
    s(window, "load", async () => {
      f.init(),
        c.clearColor(0, 0, 0, 0),
        c.enable(c.CULL_FACE),
        c.enable(c.DEPTH_TEST),
        (u.rotate.x = -0.7),
        u.position.set(0, 0, 1.2),
        f.transform.rotate.set(10, 22, 30),
        v(f),
        v(f, 0.02),
        (e("link[rel=apple-touch-icon]").href = e("link[rel=icon]").href =
          a.toDataURL()),
        u.position.set(0, 0.5, 5),
        g(),
        (function () {
          let i = 0,
            a = 0,
            h = [],
            c = !1;
          s(document, "touchstart", (t) => {
            let e = t.touches[0];
            (i = e.clientX), (a = e.clientY), (c = !0);
          }),
            s(
              document,
              "touchmove",
              (t) => {
                if ((t.preventDefault(), !c || o.active)) return;
                let e = t.touches[0];
                !h[39] && e.clientX - i > 15
                  ? ((h[39] = !0), p.input(39), (c = !1))
                  : !h[37] && e.clientX - i < -15
                  ? ((h[37] = !0), p.input(37), (c = !1))
                  : !h[40] && e.clientY - a > 15
                  ? ((h[40] = !0), p.input(40), (c = !1))
                  : !h[38] &&
                    e.clientY - a < -15 &&
                    ((h[38] = !0), p.input(38), (c = !1));
              },
              { passive: !1 }
            ),
            s(document, "touchend", (t) => {
              c && !o.active && ((h[32] = !0), p.input(32)),
                (h[32] = h[37] = h[38] = h[39] = h[40] = c = !1);
            }),
            s(document, "keydown", (t) => {
              if (!h[t.keyCode])
                if (((h[t.keyCode] = !0), r)) {
                  if (o.active) return void o.input(t.keyCode);
                  p.input(t.keyCode);
                } else h[32] && w();
            }),
            s(document, "keyup", (t) => {
              h[t.keyCode] = !1;
            }),
            s(window, "resize", g),
            s(e("#start"), "click", () => {
              r || w();
            }),
            t.Event.on("all", (t) => {
              SFX.play(t);
            }),
            t.Event.on("start", () => {
              if ((o.hide(), p.init(), !n)) {
                let t = SFX.mixer("music"),
                  e = t.context.currentTime;
                t.gain.setValueAtTime(o.volume, e),
                  (n = SFX.play("music", !0, "music"));
              }
            }),
            t.Event.on("end", () => {
              f.init(!1), o.show();
            });
        })();
    }),
      (e("ontouchstart" in window ? "#keys" : "#touch").className = "hide");
  })(Game || (Game = {}));
