##### Planning

- main page

  - renders:

    - start button if game not started
    - Player if game started
    - Target if game started

- Player
  - is responsible for:
    - updating cursor position in state
  - will render:
    - nothing if on desktop (touch disabled)
    - some form of draggable indicator on mobile (touch enabled)
      - allows game to be played on mobile
- Target

  - is responsible for:
    - checking if player is in location of target
      - show some indication that they are if true
  - when clicked, ends the game
  - will render:
    - nothing if game is running and player is not in the right location

- app state
  - store:
    - whether game is started or not
    - location in the window of target
      - make sure to handle resize (make location of target a percentage value of the screen? that way any resize still makes target appear on screen)
    - px location of target
      - mobx computed value
    - px location in the window of cursor
  - side effect (autorun) when cursor location is updated to fire target noise

##### Todo:

- add audio cues
- add 3d audio
- make it pretty
- SEO and assets stuff
- ???
