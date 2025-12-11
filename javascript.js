document.addEventListener("DOMContentLoaded", () => {
  const layout = document.querySelector(".layout");
  const belts = document.querySelectorAll(".belt");
  const titleEl = document.getElementById("belt-title");
  const textEl = document.getElementById("belt-text");
  const notesEl = document.getElementById("belt-notes");

  const loginToggle = document.getElementById("loginToggle");
  const loginPanel = document.getElementById("loginPanel");
  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");

  // Yksinkertainen "admin"-kirjautuminen frontissa (ei oikea tietoturva, vain demo/asiakkaalle)
  const ADMIN_EMAIL = "asiakas@example.com";      // vaihda asiakkaan sähköposti
  const ADMIN_PASSWORD = "salasana123";           // vaihda asiakkaan salasana

  function setLoggedInState(isLoggedIn) {
    if (!loginToggle || !loginStatus) return;
    if (isLoggedIn) {
      document.body.classList.add("is-logged-in");
      loginStatus.textContent = "Kirjautunut";
      loginToggle.textContent = "Kirjaudu ulos";
      if (loginPanel) {
        loginPanel.classList.remove("is-open");
      }
    } else {
      document.body.classList.remove("is-logged-in");
      loginStatus.textContent = "Ei kirjautunut";
      loginToggle.textContent = "Kirjaudu sisään";
    }
  }

  const storedLogin = localStorage.getItem("tkdLoggedIn") === "true";
  setLoggedInState(storedLogin);

  if (loginToggle && loginPanel && loginForm) {
    loginToggle.addEventListener("click", () => {
      const isLoggedIn = document.body.classList.contains("is-logged-in");
      if (isLoggedIn) {
        // Logout
        localStorage.removeItem("tkdLoggedIn");
        setLoggedInState(false);
      } else {
        // Näytä / piilota kirjautumispaneeli
        loginPanel.classList.toggle("is-open");
      }
    });

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("loginEmail");
      const passwordInput = document.getElementById("loginPassword");
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("tkdLoggedIn", "true");
        setLoggedInState(true);
        loginForm.reset();
      } else {
        alert("Väärä sähköposti tai salasana.");
      }
    });
  }

  const beltContent = {
    white: {
      title: "Valkoinen vyö",
      text:
        "Alkutasolla keskityn perusasentoihin, salietikettiin ja yksinkertaisiin potkuihin ja lyönteihin. Tavoite: liikkeet tuntuvat rennolta, enkä enää jännitä joka askelta.",
      notes:
        "<p>Esimerkkejä alkutason muistiinpanoista:</p><p>– Opin perusasennot ilman että joudun koko ajan vilkuilemaan muita<br>– Muistan kumarrukset ja tervehdykset alussa ja lopussa<br>– Yksi potku, joka tuntui tänään paremmalta kuin viime viikolla</p>"
    },
    yellow: {
      title: "Keltainen vyö",
      text:
        "Tällä tasolla opettelen lisää liikesarjoja ja pidempiä yhdistelmiä. Haasteena on muistaa järjestys ja pitää rytmi kasassa myös hengästyneenä.",
      notes:
        "<p>Keltaisen vyön muistiinpanot:</p><p>– Mikä liikesarja unohtuu herkimmin<br>– Mihin kohtaan hengästyn eniten sarjassa<br>– Mitä ohjaaja kehui viime treeneissä</p>"
    },
    green: {
      title: "Vihreä vyö",
      text:
        "Vihreällä vyöllä mukaan tulee lisää liikkuvuutta ja vaikeampia potkuja. Keskityn siihen, että potku lähtee lonkasta, ei pelkästään polvesta.",
      notes:
        "<p>Vihreän vyön muistiinpanot:</p><p>– Mitkä venytykset auttavat eniten korkeisiin potkuihin<br>– Yksi potku, jonka haluan saada varmemmaksi<br>– Missä tilanteessa tasapaino vielä horjuu</p>"
    },
    blue: {
      title: "Sininen vyö",
      text:
        "Sinisellä vyöllä tekniikat alkavat olla tutumpia, mutta niitä hiotaan tarkemmaksi. Tasapaino, ajoitus ja voima ovat isossa roolissa.",
      notes:
        "<p>Sinisen vyön muistiinpanot:</p><p>– Tilanteet, joissa ajoitus karkaa<br>– Harjoitus, joka tuntuu erityisen hyödylliseltä<br>– Yksi kerta, jolloin tekniikka tuntui todella hyvältä</p>"
    },
    red: {
      title: "Punainen vyö",
      text:
        "Punaisella vyöllä ajatus on, että iso osa perus- ja keskitason tekniikoista on jo selkärangassa. Tällä tasolla keskityn yksityiskohtiin ja siihen, että liikkuminen näyttää rennolta ja varmalta.",
      notes:
        "<p>Punaisen vyön muistiinpanot:</p><p>– Pienet yksityiskohdat, joihin keskityn (käden kulma, askeleen suunta)<br>– Miltä oma liike näyttää videolta katsottuna<br>– Mitä haluan seuraavaksi kysyä ohjaajalta</p>"
    },
    black: {
      title: "Musta vyö",
      text:
        "Musta vyö ei tarkoita loppua — se tarkoittaa uuden syvemmän oppimisen alkamista. Tässä vaiheessa harjoittelussa keskityn kokonaisuuksiin, mielen ja kehon hallintaan sekä jatkuvaan oppimiseen.",
      notes:
        "<p>Mustan vyön muistiinpanot:</p><p>– Mitkä osa-alueet tuntuvat vahvimmilta<br>– Mitä haluan syventää seuraavaksi<br>– Miten oma treenifilosofia on muuttunut vuosien aikana</p>"
    }
  };

  belts.forEach((belt) => {
    belt.addEventListener("click", () => {
      // Aktivoi detail-tila (siirtää vyöt vasemmalle ja avaa blogipaneelin)
      layout.classList.add("detail-open");

      // Merkitään aktiivinen vyö
      belts.forEach((b) => b.classList.remove("is-active"));
      belt.classList.add("is-active");

      // Päivitetään oikean puolen tekstit
      const key = belt.dataset.belt;
      const data = beltContent[key];
      if (data && titleEl && textEl) {
        titleEl.textContent = data.title;
        textEl.textContent = data.text;
      }
      if (data && notesEl) {
        notesEl.innerHTML = data.notes;
      }
    });
  });
});
