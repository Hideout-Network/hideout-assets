(function(){
  // Remove old popup if exists
  let oldPopup = document.getElementById("jsPopup");
  if(oldPopup) oldPopup.remove();

  // Create popup container
  let popup = document.createElement("div");
  popup.id = "jsPopup";
  popup.style.position = "fixed";
  popup.style.top = "100px";
  popup.style.left = "100px";
  popup.style.width = "320px";
  popup.style.background = "#fff";
  popup.style.border = "2px solid #000";
  popup.style.borderRadius = "6px";
  popup.style.zIndex = "999999";
  popup.style.boxShadow = "4px 4px 0 #000";
  popup.style.overflow = "hidden";
  popup.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  popup.style.opacity = "1";
  popup.style.transform = "translateY(0) scale(1)";

  // Header bar (drag + close)
  let header = document.createElement("div");
  header.style.background = "#000";
  header.style.color = "#fff";
  header.style.padding = "6px 10px";
  header.style.cursor = "move";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.fontSize = "14px";
  header.style.userSelect = "none";

  let title = document.createElement("span");
  title.textContent = "JS Executor";

  let closeBtn = document.createElement("span");
  closeBtn.textContent = "✖";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = function(){
    popup.style.opacity = "0";
    popup.style.transform = "translateY(-20px) scale(0.95)";
    setTimeout(()=>popup.remove(),400);
  };

  header.appendChild(title);
  header.appendChild(closeBtn);

  // Input box
  let input = document.createElement("textarea");
  input.style.width = "100%";
  input.style.height = "120px";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.padding = "10px";
  input.style.fontFamily = "monospace";
  input.style.fontSize = "13px";
  input.style.boxSizing = "border-box";
  input.style.background = "#fff";
  input.style.color = "#000";
  input.placeholder = "Enter JS code here...";

  // Execute button
  let btn = document.createElement("button");
  btn.textContent = "Execute";
  btn.style.margin = "10px";
  btn.style.width = "calc(100% - 20px)";
  btn.style.padding = "8px";
  btn.style.background = "#000";
  btn.style.color = "#fff";
  btn.style.border = "2px solid #000";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";
  btn.style.transition = "all 0.2s ease";
  btn.onmouseover = ()=>btn.style.background="#fff", btn.onmouseover = ()=>btn.style.color="#000";
  btn.onmouseout = ()=>{btn.style.background="#000"; btn.style.color="#fff";};

  btn.onclick = function(){
    try {
      let code = input.value;
      new Function(code)(); // safer than injecting <script>
    } catch(e) {
      alert("Error: " + e.message);
    }
  };

  // Append elements
  popup.appendChild(header);
  popup.appendChild(input);
  popup.appendChild(btn);
  document.body.appendChild(popup);

  // Drag functionality with subtle animation
  header.onmousedown = function(e){
    e.preventDefault();
    let rect = popup.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;

    popup.style.transition = "none"; // disable transition while dragging

    function mouseMoveHandler(e){
      popup.style.left = (e.clientX - offsetX) + "px";
      popup.style.top = (e.clientY - offsetY) + "px";
    }
    function mouseUpHandler(){
      popup.style.transition = "opacity 0.4s ease, transform 0.4s ease"; // restore transitions
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  // Toggle with Alt + A
  document.addEventListener("keydown", function(e){
    if(e.altKey && e.key.toLowerCase() === "a"){
      if(popup.style.display === "none"){
        popup.style.display = "block";
        popup.style.opacity = "1";
        popup.style.transform = "translateY(0) scale(1)";
      } else {
        popup.style.opacity = "0";
        popup.style.transform = "translateY(-20px) scale(0.95)";
        setTimeout(()=>popup.style.display="none",400);
      }
    }
  });
})();
