const content = document.getElementById('detail');

/**
 * Buscar o personagem especifico e trazer os seguintes dados:
 * nome
 * imagem
 * especie
 * gênero
 * mundo/dimensão
 * status
 * 1 ponto extra pra quem colocar o link para detail la na index
 * **/

let characterId = Number(window.location.hash.slice(1)) || 1;

const fetchCharacter = async (id) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const renderCharacter = (character) => {
  if (!character) {
    content.innerHTML = '<p>Detalhes não encontrados.</p>';
    return;
  }

  content.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" />
    <p>Espécie: ${character.species}</p>
    <p>Gênero: ${character.gender}</p>
    <p>Dimensão: ${character.origin.name}</p>
    <p>Status: ${character.status}</p>
    <button id="prevBtn">Anterior</button>
    <button id="nextBtn">Próximo</button>
  `;

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (characterId > 1) updateCharacterId(characterId - 1);
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    updateCharacterId(characterId + 1);
  });
};

const updateCharacterId = (newId) => {
  characterId = newId;
  window.location.hash = `#${characterId}`;
};

const loadCharacter = async () => {
  const character = await fetchCharacter(characterId);
  renderCharacter(character);
};

// Atualiza conteúdo quando o hash da URL mudar
window.addEventListener('hashchange', () => {
  characterId = Number(window.location.hash.slice(1)) || 1;
  loadCharacter();
});

// Primeira carga
loadCharacter();
