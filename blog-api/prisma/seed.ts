import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usersData = [
    {
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      },
      posts: [
        {
          title: "sunt aut",
          body: `quia et suscipit
                 suscipit recusandae consequuntur expedita et cum
                 reprehenderit molestiae ut ut quas totam
                 nostrum rerum est autem sunt rem eveniet architecto`
        }
      ]
    },
    {
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      address: {
        street: "Victor Plains Suite 879",
        suite: "Apt. 556",
        city: "Romaguera",
        zipcode: "45647-4825",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618"
        }
      },
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains"
      },
      posts: [
        {
          title: "qui est esse",
          body: `est rerum tempore vitae
                sequi sint nihil reprehenderit dolor beatae
                vitae dolorum tempore`
        }
      ]
    },
    // Add more mock users as needed
  ];

  // Create users with related data
  for (const userData of usersData) {
    try {
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          website: userData.website,
          address: {
            create: {
              street: userData.address.street,
              suite: userData.address.suite,
              city: userData.address.city,
              zipcode: userData.address.zipcode,
              geo: {
                create: {
                  lat: userData.address.geo.lat,
                  lng: userData.address.geo.lng
                }
              }
            }
          },
          company: {
            create: {
              name: userData.company.name,
              catchPhrase: userData.company.catchPhrase,
              bs: userData.company.bs
            }
          },
          posts: {
            create: userData.posts.map(post => ({
              title: post.title,
              body: post.body
            }))
          }
        }
      });

      console.log('User created with related data:', user);
    } catch (error) {
      console.error('Seed data failed for user:', userData.name, error);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
