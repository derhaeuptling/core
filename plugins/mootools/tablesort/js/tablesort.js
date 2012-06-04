/* Contao Open Source CMS, (C) 2005-2012 Leo Feyer, LGPL license */
var SORT_INDEX,THOUSANDS_SEPARATOR=",",DECIMAL_SEPARATOR=".",TableSort=new Class({initialize:function(e,t,n){var r=$(e);t&&(THOUSANDS_SEPARATOR=t),n&&(DECIMAL_SEPARATOR=n);if(r==null)return;if(!r.rows||r.rows.length<1||!r.tHead||r.tHead.rows.length<1)return;var i=null,s=Cookie.read("TS_"+e.toUpperCase());if(s!==null)var i=s.split("|");var o=r.tHead.rows[r.tHead.rows.length-1];for(var u=0;u<o.cells.length;u++){if(o.cells[u].className.indexOf("unsortable")!=-1)continue;var a=o.cells[u],f=a.innerHTML,l=(new Element("a")).addClass("pointer");l.innerHTML=f,a.innerHTML="",l.addEvent("click",function(e,t){this.resort(e,t)}.pass([u,a],this)),l.injectInside(a),i!==null&&i[0]==u&&($(a).addClass(i[1]=="desc"?"asc":"desc"),this.resort(i[0],a))}},resort:function(e,t){var n=$(t);if(n==null)return;var r=n.getParent("tr"),i=r.getParent("table");if(i==null||i.tBodies[0].rows.length<2)return;SORT_INDEX=e;var s=0,o="";while(o==""&&i.tBodies[0].rows[s])o=i.tBodies[0].rows[s].cells[e].innerHTML.replace(/<[^>]+>/ig,"").clean(),s++;var u=new Array;for(var s=0;s<i.tBodies[0].rows.length;s++)u[s]=i.tBodies[0].rows[s];t.className.indexOf("date")!=-1||o.match(/^\d{1,4}[\/\. -]\d{1,2}[\/\. -]\d{1,4}$/)?u.sort(this.sortDate):t.className.indexOf("currency")!=-1||o.match(/^[£$€Û¢´]/)||o.match(/^-?[\d\.,]+[£$€]$/)?u.sort(this.sortNumeric):t.className.indexOf("numeric")!=-1||o.match(/^-?[\d\.,]+(E[-+][\d]+)?$/)||o.match(/^-?[\d\.,]+%?$/)?u.sort(this.sortNumeric):u.sort(this.sortCaseInsensitive);if(t.className.indexOf("asc")==-1){var a=r.getChildren();for(var s=0;s<a.length;s++)a[s].removeClass("asc"),a[s].removeClass("desc");t.addClass("asc"),Cookie.write("TS_"+i.id.toUpperCase(),e+"|asc",{path:"/"})}else{var a=r.getChildren();for(var s=0;s<a.length;s++)a[s].removeClass("asc"),a[s].removeClass("desc");t.addClass("desc"),Cookie.write("TS_"+i.id.toUpperCase(),e+"|desc",{path:"/"}),u.reverse()}for(s=0;s<u.length;s++){var f=u[s].className;f=f.replace(/row_\d+/,"").replace(/odd|even|row_first|row_last/g,"").clean(),f+=" row_"+s,s==0&&(f+=" row_first"),s>=u.length-1&&(f+=" row_last"),f+=s%2==0?" even":" odd",u[s].className=f.trim();for(j=0;j<u[s].cells.length;j++){var f=u[s].cells[j].className;f=f.replace(/col_\d+/,"").replace(/odd|even|col_first|col_last/g,"").clean(),f+=" col_"+j,j==0&&(f+=" col_first"),j>=u[s].cells.length-1&&(f+=" col_last"),u[s].cells[j].className=f.trim()}i.tBodies[0].appendChild(u[s])}},sortDate:function(e,t){aa=e.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean(),bb=t.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean();var n=aa.replace(/[\/\.-]/g," ").split(" "),r=bb.replace(/[\/\.-]/g," ").split(" ");if(aa.match(/^\d{1,2}[\/\. -]\d{1,2}[\/\. -]\d{2,4}$/))var i=(n[2].length==4?n[2]:"19"+n[2])+(n[1].length==2?n[1]:"0"+n[1])+(n[0].length==2?n[0]:"0"+n[0]),s=(r[2].length==4?r[2]:"19"+r[2])+(r[1].length==2?r[1]:"0"+r[1])+(r[0].length==2?r[0]:"0"+r[0]);if(aa.match(/^\d{2,4}[\/\. -]\d{1,2}[\/\. -]\d{1,2}$/))var i=(n[0].length==4?n[0]:"19"+n[0])+(n[1].length==2?n[1]:"0"+n[1])+(n[2].length==2?n[2]:"0"+n[2]),s=(r[0].length==4?r[0]:"19"+r[0])+(r[1].length==2?r[1]:"0"+r[1])+(r[2].length==2?r[2]:"0"+r[2]);return i==s?0:i<s?-1:1},sortNumeric:function(e,t){var n=new RegExp("\\"+THOUSANDS_SEPARATOR,"g");return aa=e.cells[SORT_INDEX].innerHTML.replace(n,""),bb=t.cells[SORT_INDEX].innerHTML.replace(n,""),DECIMAL_SEPARATOR!="."&&(aa=aa.replace(DECIMAL_SEPARATOR,"."),bb=bb.replace(DECIMAL_SEPARATOR,".")),aa=aa.replace(/<[^>]+>/i).replace(/[^0-9\.,-]/g,"").clean(),bb=bb.replace(/<[^>]+>/i).replace(/[^0-9\.,-]/g,"").clean(),aa=parseFloat(aa),isNaN(aa)&&(aa=0),bb=parseFloat(bb),isNaN(bb)&&(bb=0),aa-bb},sortCaseInsensitive:function(e,t){return aa=e.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean().toLowerCase(),bb=t.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean().toLowerCase(),aa==bb?0:aa<bb?-1:1}});