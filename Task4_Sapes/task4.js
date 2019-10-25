const ZERO = 0;
const ONE = 1;
const TWO = 2;
const TEN = 10; // Math.round
const G_90 = 90; //degrees angle
const G_180 = 180; //degrees angle
window.onload = () => {
  document.getElementById('shapes').addEventListener('click', shapes);
  shapes();
};
/**constructor for Rectangle(quadrangle)*/
function Rectangle(top, bottom, left, right) {
  this.top = top;
  this.bottom = bottom;
  this.left = left;
  this.right = right;
}
/**give random value*/
function randomValue(min, max) {
  return min + Math.floor(Math.random() * (max - min + ONE));
}
/**create 100 rectangles(quadrangles) and categories*/
function shapes() {
  console.clear();
  let numberShapes = document.getElementById('amount').value || TEN * TEN;
  const COEF = document.getElementById('coef').value || TEN; // for biger shapes
  let minSide = parseInt(document.getElementById('minSide').value || ONE);
  let maxSide = parseInt(document.getElementById('maxSide').value || TEN);
  let rectangles = [];
  for (let i = ZERO; i < numberShapes; i++) {
    rectangles.push(
      new Rectangle(
        randomValue(minSide, maxSide),
        randomValue(minSide, maxSide),
        randomValue(minSide, maxSide),
        randomValue(minSide, maxSide)
      )
    );
  }
  let perimeters = rectangles.map(e => e.left + e.right + e.top + e.bottom);
  let categories = {
    quadrates: rectangles.filter(e => e.top === e.bottom && e.left === e.right && e.top === e.left), //rhomb
    rectangles: rectangles.filter(e => e.top === e.bottom && e.left === e.right && e.top !== e.left), //parallelepiped
    non_existent: rectangles.filter(
      e =>
        e.top >= e.bottom + e.left + e.right ||
        e.bottom >= e.top + e.left + e.right ||
        e.left >= e.top + e.bottom + e.right ||
        e.right >= e.top + e.bottom + e.left
    )
  };
  console.log(rectangles);
  console.log('perimeters: ', perimeters);
  console.log('categories: ', categories);
  //console.log('quadrates: ', categories.quadrates);
  //console.log('rectangles: ', categories.rectangles);
  //console.log('non existent: ', categories.non_existent);
  document.getElementById('quadrates').innerHTML = categories.quadrates.length;
  document.getElementById('rectangles').innerHTML = categories.rectangles.length;
  document.getElementById('non-existent').innerHTML = categories.non_existent.length;
  //---------------------------------additionally-------------------------------------------------

  // add categorize trapezium with equal sides
  categories.trapeziums = rectangles.filter(function(e) {
    if (e.left === e.right && e.top !== e.bottom && this.indexOf(e) === -ONE) {
      if (e.top > e.bottom) {
        e.left = e.top;
        e.top = e.bottom;
        e.bottom = e.left;
        e.left = e.right;
      }
      return true;
    } else if (e.top === e.bottom && e.left !== e.right && this.indexOf(e) === -ONE) {
      if (e.left > e.right) {
        e.bottom = e.left;
        e.left = e.top;
        e.top = e.right;
        e.right = e.left;
      } else {
        e.bottom = e.right;
        e.right = e.top;
        e.top = e.left;
        e.left = e.right;
      }
      return true;
    }
    return false;
  }, categories.non_existent);
  //console.log('trapeziums: ', categories.trapeziums);
  document.getElementById('trapezium').innerHTML = categories.trapeziums.length;
  // add categorize kites
  categories.kites = rectangles.filter(e => {
    if (e.left === e.top && e.right === e.bottom && e.right !== e.top) {
      //to do that always will equal e.left == e.bottom;  e.right == e.top;
      e.left = e.bottom;
      e.right = e.top;
      return true;
    }
    if (e.right === e.top && e.left === e.bottom && e.left !== e.top) {
      return true;
    }
    return false;
  });
  // to do head less than tail
  categories.kites.forEach(e => {
    if (e.top < e.bottom) {
      e.top = e.bottom;
      e.bottom = e.right;
      e.right = e.top;
      e.left = e.bottom;
    }
  });
  //console.log('kites: ', categories.kites);
  document.getElementById('kite').innerHTML = categories.kites.length;
  // add categorize trapeze sides are not equal
  categories.trapezes = rectangles.filter(e => {
    if (
      categories.quadrates.indexOf(e) === -ONE &&
      categories.rectangles.indexOf(e) === -ONE &&
      categories.non_existent.indexOf(e) === -ONE &&
      categories.trapeziums.indexOf(e) === -ONE &&
      categories.kites.indexOf(e) === -ONE
    ) {
      return true;
    }
    return false;
  });
  categories.trapezes.forEach(e => {
    let arrPair = Object.entries(e).sort((a, b) => a[ONE] - b[ONE]);
    let r;
    switch (arrPair[ONE + TWO][ONE - ONE]) {
      case 'bottom':
        break;
      case 'top':
        if (e.top !== e.bottom) {
          e.bottom += e.top;
          e.top = e.bottom - e.top;
          e.bottom = e.bottom - e.top;
          e.left += e.right;
          e.right = e.left - e.right;
          e.left = e.left - e.right;
        }
        break;
      case 'left':
        if (e.left !== e.bottom) {
          r = e.bottom;
          e.bottom = e.left;
          e.left = e.top;
          e.top = e.right;
          e.right = r;
        }
        break;
      case 'right':
        if (e.right !== e.bottom) {
          r = e.bottom;
          e.bottom = e.right;
          e.right = e.top;
          e.top = e.left;
          e.left = r;
        }
        break;
      default:
        break;
    }
  });
  categories.trapezes = categories.trapezes.filter(e => {
    if (
      e.left >= e.bottom - e.top + e.right ||
      e.right >= e.left + e.bottom - e.top ||
      e.bottom - e.top >= e.left + e.right
    ) {
      return false;
    } else {
      return true;
    }
  });
  //console.log('trapeze: ', categories.trapezes);
  document.getElementById('trapeze').innerHTML = categories.trapezes.length;
  // add categorize quadrangles
  categories.quadrangles = rectangles.filter(e => {
    if (
      categories.quadrates.indexOf(e) === -ONE &&
      categories.rectangles.indexOf(e) === -ONE &&
      categories.non_existent.indexOf(e) === -ONE &&
      categories.trapeziums.indexOf(e) === -ONE &&
      categories.kites.indexOf(e) === -ONE &&
      categories.trapezes.indexOf(e) === -ONE
    ) {
      return true;
    }
    return false;
  });
  //console.log('quadrangles: ', categories.quadrangles);
  document.getElementById('quadrangles').innerHTML = categories.quadrangles.length;
  //----------------------draw---------------------------------------
  let svgContainer = document.getElementById('svg-container');
  svgContainer.innerHTML = '';
  // draw quadrates
  categories.quadrates.forEach(e => {
    svgContainer.innerHTML += `<svg width='${e.top * COEF}' height='${e.left * COEF}'><rect width='${e.top *
      COEF}' height='${e.left * COEF}'/></svg>`;
  });
  // draw rectangles
  categories.rectangles.forEach(e => {
    svgContainer.innerHTML += `<svg width='${e.top * COEF}' height='${e.left * COEF}'><rect width='${e.top *
      COEF}' height='${e.left * COEF}'/></svg>`;
  });
  // draw trapeziums
  categories.trapeziums.forEach(e => {
    let space = (e.bottom - e.top) / TWO;
    let height = Math.sqrt(e.left * e.left - space * space).toFixed(ONE);
    svgContainer.innerHTML += `<svg width='${e.bottom * COEF}' height='${height * COEF}'><polygon points='${space *
      COEF},0 ${(space + e.top) * COEF},0 ${e.bottom * COEF},${height * COEF} 0,${height * COEF}'/></svg>`;
  });
  // draw kites
  categories.kites.forEach(e => {
    let h = (Math.sqrt(TWO) * e.bottom).toFixed(ONE);
    let w = (h / TWO + Math.sqrt(e.top * e.top - (h * h) / (TWO * TWO))).toFixed(ONE);
    svgContainer.innerHTML += `<svg width='${w * COEF}' height='${h * COEF}'><polygon points='0,${(h / TWO) *
      COEF} ${(h / TWO) * COEF},0 ${w * COEF},${(h / TWO) * COEF} ${(h / TWO) * COEF},${h * COEF}'/></svg>`;
  });
  // draw trapezes
  categories.trapezes.forEach(e => {
    //right angle
    let r = Math.round(
      (Math.acos((e.right ** TWO - e.left ** TWO + (e.bottom - e.top) ** TWO) / (TWO * e.right * (e.bottom - e.top))) *
        G_180) /
        Math.PI
    );
    // left angle
    let l = Math.round(
      (Math.acos((e.left ** TWO - e.right ** TWO + (e.bottom - e.top) ** TWO) / (TWO * e.left * (e.bottom - e.top))) *
        G_180) /
        Math.PI
    );
    let xl =
      Math.round(((e.right ** TWO - e.left ** TWO - (e.bottom - e.top) ** TWO) / (TWO * (e.bottom - e.top))) * TEN) /
      TEN;
    let xr =
      Math.round(((e.right ** TWO - e.left ** TWO + (e.bottom - e.top) ** TWO) / (TWO * (e.bottom - e.top))) * TEN) /
      TEN;
    let x =
      Math.round(((e.left ** TWO - e.right ** TWO + (e.bottom - e.top) ** TWO) / (TWO * (e.bottom - e.top))) * TEN) /
      TEN;

    if (e.left ** TWO + (e.bottom - e.top) ** TWO === e.right ** TWO) {
      //console.log('true', l, r, e, xl, xr, x);
      svgContainer.innerHTML += `<svg width='${e.bottom * COEF}' height='${e.left *
        COEF}'><polygon points='0,0 ${e.top * COEF},0 ${e.bottom * COEF},${e.left * COEF} 0,${e.left * COEF}'/></svg>`;
    } else if (e.right ** TWO + (e.bottom - e.top) ** TWO === e.left ** TWO) {
      svgContainer.innerHTML += `<svg width='${e.bottom * COEF}' height='${e.right *
        COEF}'><polygon points='${(e.bottom - e.top) * COEF},0 ${e.bottom * COEF},0 ${e.bottom * COEF},${e.right *
        COEF} 0,${e.right * COEF}'/></svg>`;
    } else if (l > 90) {
      let h = (Math.sqrt((e.left * TEN) ** TWO - (xl * TEN) ** TWO) / TEN).toFixed(ONE);
      let w = (xl * TEN + e.bottom * TEN) / TEN;
      svgContainer.innerHTML += `<svg width='${w * COEF}' height='${h * COEF}'><polygon points='0,0 ${e.top *
        COEF},0 ${w * COEF},${h * COEF} ${xl * COEF},${h * COEF}'/></svg>`;
    } else if (r > 90) {
      let h = (Math.sqrt((e.right * TEN) ** TWO - (xr * TEN) ** TWO) / TEN).toFixed(ONE);
      xr = Math.abs(xr);
      let w = (xr * TEN + e.bottom * TEN) / TEN;
      svgContainer.innerHTML += `<svg width='${w * COEF}' height='${h * COEF}'><polygon points='${((e.bottom * TEN -
        e.top * TEN +
        xr * TEN) *
        COEF) /
        TEN},0 ${w * COEF},0 ${e.bottom * COEF},${h * COEF} 0,${h * COEF}'/></svg>`;
    } else if (l < G_90 && r < G_90) {
      let h = (Math.sqrt((e.left * TEN) ** TWO - (x * TEN) ** TWO) / TEN).toFixed(ONE);
      let w = e.bottom;
      svgContainer.innerHTML += `<svg width='${w * COEF}' height='${h * COEF}'><polygon points='${x * COEF},0 ${((x *
        TEN +
        e.top * TEN) *
        COEF) /
        TEN},0 ${w * COEF},${h * COEF} 0,${h * COEF}'/></svg>`;
    }
  });
  // draw quadrangles
  categories.quadrangles.forEach(e => {
    let w, h, x, y, l, r;
    // side of triangle that find angles
    let c = Math.round(Math.sqrt(e.bottom ** TWO + e.right ** TWO) * TEN) / TEN;
    if (e.left + e.top <= c && e.left < e.right) {
      w = e.right;
      e.right = e.bottom;
      e.bottom = e.left;
      e.left = e.top;
      e.top = w;
    }
    c = Math.round(Math.sqrt(e.bottom ** TWO + e.right ** TWO) * TEN) / TEN;
    if (e.left + e.top <= c && e.left < e.right) {
      console.log('yet one can draw', c);
    } else {
      // right angle
      let r1 = Math.acos((e.right * TEN) / (c * TEN));
      // left angle
      let l1 = Math.acos((e.bottom * TEN) / (c * TEN));
      let r2 = Math.acos(
        ((e.top * TEN) ** TWO - (e.left * TEN) ** TWO + (c * TEN) ** TWO) / (TWO * e.top * (c * TEN * TEN))
      );
      let l2 = Math.acos(
        ((e.left * TEN) ** TWO - (e.top * TEN) ** TWO + (c * TEN) ** TWO) / (TWO * e.left * (c * TEN * TEN))
      );
      l = l1 + l2;
      r = r1 + r2;
      lg = Math.round((l * 180) / Math.PI);
      rg = Math.round((r * 180) / Math.PI);
      //console.log(c, l1, r1, l2, r2, l, r);
      //console.log(Math.sin(Math.PI / TWO));
      if (l > Math.PI / TWO) {
        x = Math.round(e.left * Math.cos(Math.PI - l) * TEN) / TEN;
      } else {
        x = Math.round(e.left * Math.cos(l) * TEN) / TEN;
      }
      if (r > Math.PI / TWO) {
        y = Math.round(e.top * Math.cos(Math.PI - r) * TEN) / TEN;
      } else {
        y = Math.round(e.top * Math.cos(r) * TEN) / TEN;
      }
    }
    //y = Math.abs(y);
    if (l > Math.PI / TWO) {
      w = e.bottom + x;
      if (r > Math.PI / TWO) {
        h = e.right + y;
        //console.log(lg, rg, x, y, w, h);
        svgContainer.innerHTML += `<svg width='${w * COEF}' height='${h * COEF}'><polygon points='0,0 ${w * COEF},${y *
          COEF} ${w * COEF},${h * COEF} ${x * COEF},${h * COEF}'/></svg>`;
      } else {
        //h = e.right;
        svgContainer.innerHTML += `<svg width='${w * COEF}' height='${e.right * COEF}'><polygon points='0,${y *
          COEF} ${w * COEF},0 ${w * COEF},${e.right * COEF} ${x * COEF},${e.right * COEF}'/></svg>`;
      }
    } else {
      //w = e.bottom;
      if (r > Math.PI / TWO) {
        h = e.right + y;
        svgContainer.innerHTML += `<svg width='${e.bottom * COEF}' height='${h * COEF}'><polygon points='${x *
          COEF},0 ${e.bottom * COEF},${y * COEF} ${e.bottom * COEF},${h * COEF} 0,${h * COEF}'/></svg>`;
      } else {
        //h = e.right;
        svgContainer.innerHTML += `<svg width='${e.bottom * COEF}' height='${e.right * COEF}'><polygon points='${x *
          COEF},${y * COEF} ${e.bottom * COEF},0 ${e.bottom * COEF},${e.right * COEF} 0,${e.right * COEF}'/></svg>`;
      }
    }
  });
}
