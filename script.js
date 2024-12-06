const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const modal = document.getElementById('modal');

// Abrir o modal
openModalButton.addEventListener('click', () => {
	modal.classList.remove('hidden');
});

// Fechar o modal
closeModalButton.addEventListener('click', () => {
	modal.classList.add('hidden');
});

// Evitar fechamento ao clicar no conteúdo do modal
modal.querySelector('div').addEventListener('click', (event) => {
	event.stopPropagation();
});
window.onload = function () {
	// URL da requisição
	const url =
		'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions';

	// Realizando a requisição GET
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Erro na requisição: ' + response.statusText);
			}
			// Tratando o corpo da resposta como texto

			return response.text();
		})
		.then((text) => {
			try {
				// Convertendo a string JSON para um objeto JavaScript
				const body = JSON.parse(text);
				const data = JSON.parse(body.body);
				// Seleciona o corpo da tabela
				const tableBody = document.getElementById('transactionTableBody');

				// Itera sobre os dados e cria as linhas da tabela
				data.forEach((item) => {
					// Criação de cada linha
					const row = document.createElement('tr');
					row.classList.add(
						'bg-white',
						'border-b',
						'border-gray-300',
						'text-center',
						'dark:bg-gray-800',
						'dark:border-gray-700'
					);

					row.innerHTML = `
						<td class="px-6 py-4">${new Date(item.date).toLocaleDateString()}</td>
						<td class="px-6 py-4">
							<span class="text-green-600 font-semibold p-1 rounded-full px-4 inline-flex items-center gap-2">
								${item.type === 'entrada' ? '+ Entrada' : '- Saída'}
							</span>
						</td>
						<td class="px-6 py-4">${item.price}</td>
						<td class="px-6 py-4">${item.description}</td>
						<td class="px-6 py-4 text-center">
							<a href="${
								item.file
							}" download class="p-2 text-blue-600 hover:underline inline-flex items-center gap-2">
								<span>Baixar</span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
								</svg>
							</a>
						</td>
						<td class="px-6 py-4">
							<span class="text-purple-600 font-semibold p-1 rounded-full px-4 bg-purple-500/20 inline-block">
								${item.category}
							</span>
						</td>
						<button class="edit-btn" onclick="editarElemento(1)">
								<i class="fas fa-pencil-alt"></i> Editar
							</button>
					`;
					tableBody.appendChild(row);
				});
			} catch (error) {
				console.error('Erro ao processar o JSON:', error);
				// Exibir mensagem de erro no caso de falha ao converter JSON
				document.getElementById('transactionTableBody').innerHTML = `
					<tr>
						<td colspan="6" class="px-6 py-4 text-center text-red-600">
							Erro ao processar os dados: ${error.message}
						</td>
					</tr>
				`;
			}
		})
		.catch((error) => {
			console.error('Erro:', error);
			// Exibir mensagem de erro no caso de falha na requisição
			document.getElementById('transactionTableBody').innerHTML = `
				<tr>
					<td colspan="6" class="px-6 py-4 text-center text-red-600">
						Erro ao carregar as transações: ${error.message}
					</td>
				</tr>
			`;
		});
};
