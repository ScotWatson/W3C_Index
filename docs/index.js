/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

window.addEventListener("load", function (evt) {
  const xmlFetch = fetch("W3C.xml");
  const xmlText = xmlFetch.then(function (response) {
    console.log(response);
    return response.text();
  });
  xmlText.then(function (text) {
    console.log("parse");
    console.log(text);
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    console.log(xml);
    let arrDocuments = Array.from(xml.documentElement.children);
    console.log(arrDocuments.length);
    const arrStandards = arrDocuments.filter(function (elem) {
      return (elem.getAttribute("type") === "REC");
    });
    arrStandards.sort(function (elem1, elem2) {
      if ( elem1.getAttribute("name") < elem2.getAttribute("name") ) {
        return -1;
      } else if ( elem1.getAttribute("name") > elem2.getAttribute("name") ) {
        return 1;
      } else {
        return 0;
      }
    });
    const divDocumentsContainer = document.createElement("div");
    divDocumentsContainer.style.display = "block";
    divDocumentsContainer.style.position = "absolute";
    divDocumentsContainer.style.left = "0px";
    divDocumentsContainer.style.top = "100px";
    divDocumentsContainer.style.height = "100%";
    divDocumentsContainer.style.width = "100%";
    divDocumentsContainer.style.overflowX = "hidden";
    divDocumentsContainer.style.overflowY = "scroll";
    document.body.appendChild(divDocumentsContainer);
    const tblDocuments = document.createElement("table");
    tblDocuments.style.display = "block";
    tblDocuments.style.position = "absolute";
    tblDocuments.style.left = "0px";
    tblDocuments.style.top = "0px";
    tblDocuments.style.height = "100%";
    tblDocuments.style.width = "100%";
    divDocumentsContainer.appendChild(tblDocuments);
    for (let child of arrStandards) {
      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      const a = document.createElement("a");
      a.appendChild(document.createTextNode(child.getAttribute("name")));
      a.href = "https://www.w3.org/TR/" + child.getAttribute("location");
      a.target = "_blank";
      tdName.appendChild(a);
      tr.appendChild(tdName);
      const tdDate = document.createElement("td");
      tdDate.appendChild(document.createTextNode(child.getAttribute("date")));
      tr.appendChild(tdDate);
      tblDocuments.appendChild(tr);
    }
  });
});
