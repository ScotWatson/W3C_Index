/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

document.addEventListener("load", function (evt) {
  const xmlFetch = fetch("w3c.xml");
  const xmlText = xmlFetch.then(function (response) {
    return response.text();
  });
  xmlText.then(function (text) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    for (let child of xml.children) {
      let p = document.createElement("p");
      let a = document.createElement("a");
      a.appendChild(document.createTextNode(child.getAttribute("name")));
      a.href = "https://www.w3.org/TR/" + child.getAttribute("location");
      p.appendChild(a);
      document.body.appendChild(p);
    }
  });
});
