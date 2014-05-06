var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem)
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = {
      'label': ['Résidentiel (1000kWh)', 'Petite puissance (10 000kWh)', 'Moyenne puissance (400 000kWh)', 'Grande puissance 30 600 000kWh)'],
      'values': [
      {
        'label': 'Montreal',
        'values': [6.87, 9.05, 7.38, 4.62]
      },
      {
        'label': 'Calgary',
        'values': [14.81,16.93,15.27,14.02]
      },
      {
        'label': 'Charlottetown',
        'values': [14.87,15.54,12.87,8.53]
      },
      {
        'label': 'Edmonton',
        'values': [13.9,13.25,17.92,13.13]
      },
       {
        'label': 'Halifax',
        'values': [15.45,14.85,12.44,9.33]
      },
       {
        'label': 'Moncton',
        'values': [11.82,12.46,10.98,6.86]
      },
       {
        'label': 'Ottawa',
        'values': [12.39,12.26,10.59,6.2]
      },
       {
        'label': 'Regina',
        'values': [13.15,10.82,9.53,5.95]
      },
       {
        'label': "St John's",
        'values': [12.55,12.58,9.82,3.98]
      },
       {
        'label': 'Toronto',
        'values': [12.48,12.4,11.85,10.81]
      },
      {
        'label': 'Vancouver',
        'values': [8.91,9.6,7.23,5.06]
      },
      {
        'label': 'Winnipeg',
        'values': [7.63,7.48,5.76,3.78]
      }]

  };

  function sum(values){
    return values.reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
  }

  /*
  json.values.sort(function(a, b) {
    var suma= sum(a.values);
    var sumb= sum(b.values);
    return suma - sumb;
  });
  */

  function sortData(data, sorter) {
    data.sort(function(a, b) {
      var suma= sum(a.values);
      var sumb= sum(b.values);
      return sorter(suma, sumb);
    })
  }

  function ascendingSort(a, b) { return a - b; }
  function descendingSort(a, b) { return b - a; }

  sortData(json.values, ascendingSort);

  console.log(json.values);

    //end
    var json2 = {
        'label': ['Résidentiel (1000kWh)', 'Petite puissance (10 000kWh)', 'Moyenne puissance (400 000kWh)', 'Grande puissance 30 600 000kWh)'],
        'values': [
        {
        'label': 'Montreal',
        'values': [7.89,10.41,8.49,5.31,]
      },
      {
        'label': 'Calgary',
        'values': [15.55,17.77,16.03,14.72,2]
      },
      {
        'label': 'Charlottetown',
        'values': [16.95,17.71,14.68,9.72,2]
      },
      {
        'label': 'Edmonton',
        'values': [14.6,13.91,18.82,13.87,2]
      },
       {
        'label': 'Halifax',
        'values': [16.22,17.08,14.3,10.73,2]
      },
       {
        'label': 'Moncton',
        'values': [13.36,14.08,12.4,7.75,2]
      },
       {
        'label': 'Ottawa',
        'values': [14,13.86,11.97,7,2]
      },
       {
        'label': 'Regina',
        'values': [15.12,13.03,11.48,7.17,2]
      },
       {
        'label': 'St Johns',
        'values': [13.17,14.22,11.1,4.5,2]
      },
       {
        'label': 'Toronto',
        'values': [14.3,14.21,13.39,12.21,2]
      },
      {
        'label': 'Vancouver',
        'values': [9.55,10.76,8.09,5.66,2]
      },
      {
        'label': 'Winnipeg',
        'values': [8.73,8.75,6.74,4.02,2]
      }]

    };
    //init PieChart
    var pieChart = new $jit.PieChart({
      //id of the visualization container
      injectInto: 'infovis',
      //whether to add animations
      animate: true,
      //offsets
      offset: 30,
      sliceOffset: 0,
      labelOffset: 20,
      //slice style
      type: useGradients? 'stacked:gradient' : 'stacked',
      //whether to show the labels for the slices
      showLabels:true,
      //resize labels according to
      //pie slices values set 7px as
      //min label size
      resizeLabels: 7,
      //label styling
      Label: {
        type: labelType, //Native or HTML
        size: 20,
        family: 'Arial',
        color: 'white'
      },
      //enable tips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
           tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      }
    });
    //load JSON data.
    pieChart.loadJSON(json);
    //end
    var list = $jit.id('id-list'),
        button = $jit.id('update'),
        titleWithTax = $jit.id('center-title-wtax'),
        titleWithoutTax = $jit.id('center-title-ntax');
    //update json on click
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      if(util.hasClass(button, 'gray')){
        util.removeClass(button, 'gray');
        util.addClass(button, 'white');
        button.innerHTML = "Prix avec taxes";
        util.removeClass(titleWithoutTax, 'hidden');
        util.addClass(titleWithTax, 'hidden');
        pieChart.updateJSON(json);}
      else{
      util.removeClass(button, 'white');
      util.addClass(button, 'gray');
      button.innerHTML = "Prix sans taxes";
      util.removeClass(titleWithTax, 'hidden');
      util.addClass(titleWithoutTax, 'hidden');
      pieChart.updateJSON(json2);}
    });
    //dynamically add legend to list
    var legend = pieChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}
