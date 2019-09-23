const svgns = "http://www.w3.org/2000/svg";
const def_grid = 8;
const def_width = 500;
function output(filename, data, type) {
  let blob = new Blob([data], {type: type});
  let elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;        
  document.body.appendChild(elem);
  elem.click();        
  document.body.removeChild(elem);
}
function input() {
  form_1 = document.createElement("form");
  form_1_1 = document.createElement("label");
  form_1_1.setAttribute("class","f_label");
  form_1_1.setAttribute("id","l_if");
  form_1_1.setAttribute("for","input_file");
  form_1.append(form_1_1);
  form_1_1.innerText = "Drag'n'drop";
  form_1_3 = document.createElement("input");
  form_1_3.setAttribute("type","file");
  form_1_3.setAttribute("id","input_file");
  form_1_3.setAttribute("name","input_file");
  form_1.append(form_1_3);
  return new Promise(function (resolve,reject) {
    form_1_1.addEventListener("drop", async function(e) {
      e.preventDefault();
      resolve(await read(e.dataTransfer.files[0]));
    });
    form_1_1.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
    form_1_3.addEventListener("change", async function(e) {
      resolve(await read(e.target.files[0]));
    });
    document.querySelector("#main_view").innerHTML = "";
    document.querySelector("#main_view").append(form_1);
  });
}
async function interface_control() {
  control_form_1 = document.createElement("form");
  control_form_1.setAttribute("id","mainform");

  control_form_1_1 = document.createElement("label");
  control_form_1_1.setAttribute("for","targetwidth");
  control_form_1.append(control_form_1_1);

  control_form_1_1.innerText = "Target image width:";
  control_form_1_3 = document.createElement("input");
  control_form_1_3.setAttribute("type","number");
  control_form_1_3.setAttribute("min","1");
  control_form_1_3.setAttribute("id","targetwidth");
  control_form_1_3.setAttribute("name","targetwidth");
  control_form_1_3.setAttribute("value",def_width);
  control_form_1.append(control_form_1_3);

  control_form_1_5 = document.createElement("label");
  control_form_1_5.setAttribute("for","targetgrid");
  control_form_1.append(control_form_1_5);
  control_form_1_5.innerText = "Pixel size:";

  control_form_1_7 = document.createElement("input");
  control_form_1_7.setAttribute("type","number");
  control_form_1_7.setAttribute("min","1");
  control_form_1_7.setAttribute("id","targetgrid");
  control_form_1_7.setAttribute("name","targetgrid");
  control_form_1_7.setAttribute("value",def_grid);
  control_form_1.append(control_form_1_7);

  control_form_1_9 = document.createElement("label");
  control_form_1_9.setAttribute("for","targetcolor");
  control_form_1.append(control_form_1_9);
  control_form_1_9.innerText = "Target color:";

  control_form_1_11 = document.createElement("input");
  control_form_1_11.setAttribute("type","color");
  control_form_1_11.setAttribute("id","targetcolor");
  control_form_1_11.setAttribute("name","targetcolor");
  control_form_1_11.setAttribute("value","#e66465");
  control_form_1.append(control_form_1_11);
  
  control_form_1_13 = document.createElement("label");
  control_form_1_13.setAttribute("for","targetthresh");
  control_form_1.append(control_form_1_13);
  control_form_1_13.innerText = "Threshold:";
  
  control_form_1_15 = document.createElement("input");
  control_form_1_15.setAttribute("type","number");
  control_form_1_15.setAttribute("min","0");
  control_form_1_15.setAttribute("max","100");
  control_form_1_15.setAttribute("id","targetthresh");
  control_form_1_15.setAttribute("name","targetthresh");
  control_form_1_15.setAttribute("value","100");
  control_form_1.append(control_form_1_15);
  
  control_form_1_17 = document.createElement("input");
  control_form_1_17.setAttribute("id","run");
  control_form_1_17.setAttribute("type","button");
  control_form_1_17.setAttribute("name","run");
  control_form_1_17.setAttribute("value","Run Pixelization !");
  control_form_1_17.addEventListener("click", function () {
    pixelator(parseInt(document.querySelector("#targetgrid").value),
      parseInt(document.querySelector("#targetwidth").value))
  });
  control_form_1.append(control_form_1_17);
  
  control_form_1_18 = document.createElement("input");
  control_form_1_18.setAttribute("id","dl");
  control_form_1_18.setAttribute("type","button");
  control_form_1_18.setAttribute("name","dl");
  control_form_1_18.setAttribute("value","Download result !");
  control_form_1_18.addEventListener("click",function() {
    output("pixel.svg",
      document.querySelector("#svg").outerHTML.replace(/></g,">\n<"),
        "image/svg+xml");
  });
  control_form_1.append(control_form_1_18);
    
  control_form_1_19 = document.createElement("input");
  control_form_1_19.setAttribute("id","change");
  control_form_1_19.setAttribute("type","button");
  control_form_1_19.setAttribute("name","change");
  control_form_1_19.setAttribute("value","Change image");
  control_form_1_19.addEventListener("click",function() {
    document.querySelector("#mainform").remove();
    main();
  });
  control_form_1.append(control_form_1_19);
  
  document.querySelector("#main_view").append(control_form_1);
}
async function main(image=false) {
  image = (image) ? image:await input();
  main_view = document.querySelector("#main_view");
  img = document.createElement("img");
  img.setAttribute("src",image);
  //img.setAttribute("style","display:none;");
  img.setAttribute("id","img");
  img.setAttribute("style","visibility:hidden;");
  let svg = document.createElementNS(svgns, "svg");
  svg.addEventListener("drop", async function(e) {
    e.preventDefault();
    main(await read(e.dataTransfer.files[0]))
  });
  svg.addEventListener("dragover", function(e) {e.preventDefault();});
  svg.setAttribute("xmlns", svgns)  
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
  svg.setAttribute("id", "svg") 
  main_view.innerHTML = "";
  main_view.append(svg);
  main_view.append(img);
  interface_control();
  img.addEventListener("load", function () {pixelator(8,500)});
}
function read(what) {
  return new Promise(function(resolve,reject) {
    let reader = new FileReader();
    reader.addEventListener("load", function() {
      resolve(this.result)
    });
    reader.readAsDataURL(what);
  })
}
function rgb_to_hsv(rgb_array) {
  let h = d = 0;
  let r = rgb_array[0]/255;
  let g = rgb_array[1]/255;
  let b = rgb_array[2]/255;
  let rgb_min = Math.min(r,Math.min(g,b));
  let rgb_max = Math.max(r,Math.max(g,b));
  if (rgb_min == rgb_max) {
    return [0,0,rgb_min];
  }
  if (r == rgb_min) {
    d = g-b;
    h = 3;
  } else {
    if (b == rgb_min) {
      h = 1;
      d = r-g;
    } else {
      h = 5;
      d = b-r;
    }
  }
  h = 255*(h - d/(rgb_max - rgb_min))/6;
  return [h,255*(rgb_max - rgb_min)/rgb_max,255*rgb_max];
}
function filter_param() {
  return {
    threshold:
      parseInt(document.querySelector("#targetthresh").value)*2.55,
    rgb:rgb_to_hsv(
      hex_to_rgb(document.querySelector("#targetcolor").value))
  }
}
function hex_to_rgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [ parseInt(result[1], 16),
                      parseInt(result[2], 16),
                      parseInt(result[3], 16) ]
                  :null;
}
async function pixelator(grid,width) {
  let img =  document.getElementById("img");
  let height = (width/img.width)*img.height
  c = document.createElement("canvas");
  c.setAttribute("id","can");
  c.setAttribute("style","display:none;");
  document.getElementById("svg").setAttributeNS(null, "viewBox", "0 0 "
  +width+" "+height);
  document.getElementById("svg").innerHTML = "";
  img.setAttribute("style","visibility:visible;");
  c.width = width;
  c.height = height;
  let ctx = c.getContext("2d");
  ctx.drawImage(img,0,0,width,height);
  y = 0;
  x = 0;
  let parameters = filter_param();
  let pixel_worker = new Worker("worker.js");
  pix = ctx.getImageData(x, y, grid, grid);
  pixel_worker.postMessage(
    { x:x,
      y:y,
      pix_data:pix.data,
      filter:parameters,grid:grid
    });
  pixel_worker.onmessage = function(e) {
    if (e.data.y < height) {
      if (e.data.x < width) {
        x = e.data.x + grid
      } else {
        x = 0;
        y = e.data.y + grid
      }
      pix = ctx.getImageData(x, y, grid, grid);
      pixel_worker.postMessage(
        { x:x,
          y:y,
          pix_data:pix.data,
          filter:parameters,
          grid:grid
        })
    } else {
      c.remove();
    }
    if (e.data.element) {
      draw([e.data.element]);
    }
  }
}
function draw(elements) {
  let j = 0;
  for (j=0;j<elements.length;j++) {
    element = elements[j];
    let rect = document.createElementNS(svgns, element.element);
    for (i in element.attributes) {
      rect.setAttributeNS(null, i, element.attributes[i]);
    }
    document.getElementById("svg").appendChild(rect);
  }
}
function incr_wait(i,t,rand=false) {
  t = (rand) ? Math.floor(t+2*t*Math.random()):t;
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(i+1);
    },t)
  })
}
