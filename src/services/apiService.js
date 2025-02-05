import axios from "axios";
import { api_server } from "../config/api";
import { Contribution, Dwelling, MapItem, Neighbor, Period } from "../models";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: api_server,
    });
  }

  async get(path) {
    return await this.api.get(path);
  }

  async post(path, data) {
    const response = await this.api.post(path, data);
    return response;
  }

  dwelling = {
    get: async () => {
      return await this.api.get("/dwellings");
    },
    getTitle: async (uuid) => {
      return await this.api.get(`/dwellings/${uuid}/title`);
    },
    find: async (uuid) => {
      const response = await this.api.get(`/dwellings/${uuid}`);
      return {
        ...response,
        data: new Dwelling(response.data),
      };
    },
    findByCoordinatesUuid: async (coordinates_uuid) => {
      const response = await this.api.get(
        `/dwellings?coordinates_uuid=${coordinates_uuid}`
      );

      return {
        ...response,
        data: response.data.map((item) => new Dwelling(item))[0] || null,
      };
    },
    changeInhabited: async (uuid) => {
      const response = await this.api.post(
        `/dwellings/${uuid}/inhabited?_method=PATCH`
      );
      return response;
    },
    getLastContribution: async (uuid) => {
      const response = await this.api.get(
        `/dwellings/${uuid}/last-contribution`
      );
      return response;
    },
    getContributions: async (uuid) => {
      const response = await this.api.get(`/dwellings/${uuid}/contributions`);
      return {
        ...response,
        data: response.data.map((item) => new Contribution(item)),
      };
    },
    getPendingPeriods: async (uuid) => {
      const response = await this.api.get(
        `/dwellings/${uuid}/pending-periods`
      );
      return {
        ...response,
        data: response.data.map((item) => new Period(item)),
      };
    },
    getNeighbors: async (uuid) => {
      const response = await this.api.get(`/dwellings/${uuid}/neighbors`);
      return {
        ...response,
        data: response.data.map((item) => new Neighbor(item)),
      };
    },
    createNeighbor: async (uuid, data) => {
      const response = await this.api.post(
        `/dwellings/${uuid}/neighbors`,
        data
      );
      return {
        ...response,
        data: new Neighbor(response.data),
      };
    },
    createPeriod: async (uuid, data) => {
      const response = await this.api.post(`/dwellings/${uuid}/period`, data);
      return {
        ...response,
        data: new Period(response.data),
      };
    },
  };

  neighbor = {
    find: async (uuid) => {
      const response = await this.api.get(`/neighbors/${uuid}`);
      return {
        ...response,
        data: new Neighbor(response.data),
      };
    },
    delete: async (uuid) => {
      const response = await this.api.post(
        `/neighbors/${uuid}?_method=DELETE`
      );
      return response;
    },
    update: async (uuid, data) => {
      const response = await this.api.post(
        `/neighbors/${uuid}?_method=PUT`,
        data
      );
      return {
        ...response,
        data: new Neighbor(response.data),
      };
    },
    search: async (query) => {
      // Validar que sea de tipo string
      if (typeof query !== "string") {
        console.log(typeof query, query);
        return {
          data: [],
        };
      }
    
      // Validar que el query tenga al menos 3 caracteres
      if (!query || query.length < 3) {
        return {
          data: [],
        };
      }
    
      // Dividir el query por espacios
      // Eliminar espacios iniciales y finales
      const palabras = query.split(" ").map(palabra => palabra.trim()).filter(palabra => palabra.length > 0);

      
    
      // Realizar una solicitud por cada palabra y almacenar los resultados
      const resultados = await Promise.all(
        palabras.map(async (palabra) => {
          const response = await this.api.get(`/neighbors/search?query=${palabra}`);
          return response.data; // Asumiendo que la respuesta contiene los datos en la propiedad 'data'
        })
      );
    
      // Combinar los resultados y eliminar duplicados
      const datosCombinados = resultados.flat();
      const datosUnicos = Array.from(new Set(datosCombinados.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
    
      return {
        data: datosUnicos,
      };
    }
  };

  contribution = {
    get: async () => {
      const response = await this.api.get("/contributions");
      return {
        ...response,
        data: response.data.map((item) => new Contribution(item)),
      };
    },
    getNeighborName: async (contribution_uuid) => {
      const response = await this.api.get(
        `/contributions/${contribution_uuid}/neighbor-name`
      );
      return response;
    },
    find: async (uuid) => {
      const response = await this.api.get(`/contributions/${uuid}/?admin=1`);
      return {
        ...response,
        data: new Contribution(response.data)
      };
    },
  };

  period = {
    find: async (uuid) => {
      const response = await this.api.get(`/periods/${uuid}`);
      return {
        ...response,
        data: new Period(response.data),
      };
    },
    delete: async (uuid) => {
      const response = await this.api.post(`/periods/${uuid}?_method=DELETE`);
      return response;
    },
  };

  map = {
    contribuions: async () => {
      const response = await this.api.get("/map/contributions");
      return {
        ...response,
        data: response.data.map((item) => new MapItem(item)),
      };
    },
  };
}

const apiService = new Api();
export default apiService;
