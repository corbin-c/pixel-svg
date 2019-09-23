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
  }
  else {
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
function filter_pix(pix_array,param) {
  if (param.threshold > 254) {
    return true;
  } else {
    pix_array = rgb_to_hsv(pix_array)
    let i = 0;
    for (i=0;i<param.rgb.length;i++) {
      if (Math.abs(param.rgb[i] - pix_array[i]) > param.threshold) {
        return false;
      }
    }
    return true;
  }
}
function virtual_draw(matrix,grid) {
  let color = matrix[2]
  if (color[3] != 0) {
    let element = {
      element:"rect",
      attributes:{
        x:matrix[0]*grid,
        y:matrix[1]*grid,
        height:grid,
        width:grid,
        }}  
    if (color[3] != 255) {
      element.attributes.opacity = color[3]/255;
      element.attributes["stroke-opacity"] = color[3]/255;
    }
    color = "rgb("+color[0]+","+color[1]+","+color[2]+")";
    element.attributes.fill = color;
    element.attributes.stroke = color;
    return element;
  } else {
    return false;
  }
}
onmessage = function(e) {
  console.log(e);
  if (filter_pix(e.data.pix_data,e.data.filter)) {
    postMessage({element:virtual_draw([e.data.x/e.data.grid,e.data.y/
      e.data.grid,e.data.pix_data],e.data.grid),x:e.data.x,y:e.data.y});
  } else {
    postMessage({element:false,x:e.data.x,y:e.data.y});
  }
}
