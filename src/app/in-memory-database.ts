import { InMemoryDbService } from "angular-in-memory-web-api"

import { Category } from "./pages/categories/shared/category.model";

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categories: Category[] = [
            { id: 1, name: "Lazer", description: "Pagamentos de Contas da Casa"},
            { id: 2, name: "Saúde", description: "Plano de saúde e Remédios"},
            { id: 3, name: "Lazer", description: "Cinema, parques, praia, etc"},
            { id: 4, name: "Salário", description: "Recebimento do Salário"},
            { id: 5, name: "Freelas", description: "Trabalhos com freelancer"},
        ];

        return { categories }
    }
}