"use strict";(self.webpackChunkcdc_rss=self.webpackChunkcdc_rss||[]).push([[423],{423:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});const r=document.getElementById("Data"),a=e=>e.replace(/\*([^\*]+)\*/g,"<strong>$1</strong>");var s=function(e,t,n,s){const o=[...e.result.values].map((e=>{if(n){const[t,n,r]=e;return`\n<tr>\n  <td><a href="${n}" target="_blank" rel="noopener noreferrer">${t}</a></td>\n  <td>${a(r)}</td>\n</tr>`}{const[t,n,r,s]=e;return`\n<tr>\n  <td><a href="${n}" target="_blank" rel="noopener noreferrer">${t}</a></td>\n  <td>${r}</td>\n  <td>${a(s)}</td>\n</tr>`}})),i=`\n<div class="table__wrapper">\n  <table class="margin--bottom--2">\n    <caption id="${c=t,c.replace(/\s/g,"-").toLowerCase()}">${t}</caption>\n    <thead>\n      <tr>\n        <th>Title</th>\n        ${n?"":"<th>Date</th>"}\n        <th>Description</th>\n      </tr>\n    </thead>\n    <tbody>\n      ${o.join("")}\n    </tbody>\n  </table>\n</div>`;var c;s&&(r.innerHTML=""),r.insertAdjacentHTML("beforeend",i)};const o="1_fc2lDA-UBFxINhj1QaOZ07ZlLlufzg4lrOCoVKXwEI",i={apiKey:"AIzaSyAUAfvITHm6rfXD5hYwsGA-AYjc2onrm1g",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"]},c={spreadsheetId:o,range:"RSS Import"},d={spreadsheetId:o,range:"US Outbreaks"},l={spreadsheetId:o,range:"International Outbreaks"};var h=function(){gapi.load("client",(()=>{gapi.client.init(i).then((()=>gapi.client.sheets.spreadsheets.values.get(d))).then((e=>(s(e,"Latest US Outbreaks",!1,!0),gapi.client.sheets.spreadsheets.values.get(l)))).then((e=>(s(e,"Latest International Outbreaks",!1,!1),gapi.client.sheets.spreadsheets.values.get(c)))).then((e=>{s(e,"Latest CDC News Releases",!0,!1)}),(e=>{console.error("Error trying to fetch the alert from gapi:",e)}))}))}}}]);