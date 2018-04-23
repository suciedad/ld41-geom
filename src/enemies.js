export default {
  list: [
    {
      name: "Chicken",
      boardSize: 3,
      hp: 25,
      posColors: ['red', 'blue'],
      abils: {
        attack: 1,
        defence: 3,
        heal: 0,
        goldDrop: 1,
        AI: "dumb"
      }
    },
    {
      name: "Big Angry Slime",
      boardSize: 3,
      hp: 75,
      posColors: ['red', 'blue'],
      abils: {
        attack: 3,
        defence: 5,
        heal: 0,
        goldDrop: 3,
        AI: "dumb"
      }
    },
    {
      name: "Sorcerer",
      boardSize: 4,
      hp: 200,
      posColors: ['red', 'blue', 'green'],
      abils: {
        attack: 13,
        defence: 8,
        heal: 5,
        goldDrop: 10,
        AI: "smart"
      }
    },
    {
      name: "Brother Death",
      boardSize: 5,
      hp: 500,
      posColors: ['red', 'blue', 'green'],
      abils: {
        attack: 23,
        defence: 8,
        heal: 2,
        goldDrop: 15,
        AI: "smart"
      }
    },
    {
      name: "Emperor",
      boardSize: 5,
      hp: 1000,
      posColors: ['red', 'blue', 'green'],
      abils: {
        attack: 18,
        defence: 20,
        heal: 12,
        goldDrop: 25,
        AI: "smart"
      }
    },
    {
      name: "World Eater",
      boardSize: 6,
      hp: 5000,
      posColors: ['red', 'blue', 'green'],
      abils: {
        attack: 40,
        defence: 30,
        heal: 20,
        goldDrop: 50,
        AI: "masterpiece"
      }
    }
  ]
}
