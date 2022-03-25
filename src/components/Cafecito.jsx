import React from "react";

function Cafecito() {
  return (
    <div className="cafecito">
      <h5>Los invito a apoyar mis proyectos con un Cafecito</h5>
      <a href="https://cafecito.app/agusgrance" rel="noopener" target="_blank">
        <img
          srcset="https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x"
          src="https://cdn.cafecito.app/imgs/buttons/button_5.png"
          alt="Invitame un café en cafecito.app"
        />
      </a>
    </div>
  );
}

export default Cafecito;
