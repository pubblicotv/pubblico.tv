window.addEventListener('load', function () {
    // obtain cookieconsent plugin
    var cookieconsent = initCookieConsent();

    // run plugin with config object
    cookieconsent.run({
        autorun: true,
        current_lang: 'it',
        autoclear_cookies: true,	// default: false
		hide_from_bots: true,
        page_scripts: true,

        onFirstAction: function(user_preferences, cookie){
            // callback triggered only once
        },

        onAccept: function (cookie) {
            // ... cookieconsent accepted
        },

        onChange: function (cookie, changed_preferences) {
            // ... cookieconsent preferences were changed
        },

        languages: {
            it: {
                consent_modal: {
					layout: 'cloud',                      // box,cloud,bar
					position: 'top center',           // bottom,middle,top + left,right,center
					transition: 'slide',                 // zoom,slide
                    title: 'Gestisci consenso cookies',
                    description: 'Ciao, questo sito utilizza cookie essenziali per garantirne il corretto funzionamento e cookie analitici per capire come interagisci con esso. I cookie analitici saranno impostati solo previa approvazione. <a aria-label="Cookie policy" class="cc-link" href="#">Leggi cookie policy</a>',
                    primary_btn: {
                        text: 'Accetta tutti',
                        role: 'accept_all'              // 'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Impostazioni',
                        role: 'settings'                // 'settings' or 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Preferenze cookie',
                    save_settings_btn: 'Salva impostazioni',
                    accept_all_btn: 'Accetta tutti',
                    reject_all_btn: 'Rifiuta tutti',       // optional, [v.2.5.0 +]
                    cookie_table_headers: [
                        {col1: 'Nome'},
                        {col2: 'Dominio'},
                        {col3: 'Scadenza'},
                        {col4: 'Descrizione'},
                        {col5: 'Tipo'}
                    ],
                    blocks: [
                        {
                            title: 'Utilizzo cookie',
                            description: 'Il sito usa i cookie per garantire le funzionalità di base del sito Web e per migliorare la tua esperienza online. Puoi scegliere per ciascuna categoria di accettare/rifiutare quando vuoi.'
                        }, {
                            title: 'Cookies strettamente necessari',
                            description: 'Questi cookie sono essenziali per il corretto funzionamento del  sito web. Senza questi cookie, il sito Web non funzionerebbe correttamente.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }
                        }, {
                            title: 'Cookie Analitici',
                            description: 'Questi cookie raccolgono informazioni su come utilizzi il sito web, quali pagine hai visitato e quali link hai cliccato. Tutti i dati sono resi anonimi e non possono essere utilizzati per identificarti.',
                            toggle: {
                                value: 'analytics',
                                enabled: true,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '^_ga',
                                    col2: 'google.com',
                                    col3: '2 anni',
                                    col4: 'Utilizzato per distinguere gli utenti',
                                    col5: 'Cookie persistente',
                                    is_regex: true
                                },
                                {
                                    col1: '_ga_<container-id>',
                                    col2: 'google.com',
                                    col3: '2 anni',
                                    col4: 'Utilizzato per persistere lo stato della sessione',
                                    col5: 'Cookie persistente'
                                }
                            ]
                        }, {
                            title: 'Maggiori informazioni',
                            description: 'Per qualsiasi domanda in relazione alla politica sui cookie e alle tue scelte,  <a class="cc-link" href="https://www.pubblico.tv">contattami</a>.',
                        }
                    ]
                }
            }
        }
    });
});
