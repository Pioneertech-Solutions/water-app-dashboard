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
    try {
      const response = await this.api.get(path);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async post(path, data) {
    try {
      const response = await this.api.post(path, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  dwelling = {
    get: async () => {
      try {
        const response = await this.api.get("/dwellings");
        return response;
      } catch (error) {
        throw error;
      }
    },
    getTitle: async (uuid) => {
      try {
        const response = await this.api.get(`/dwellings/${uuid}/title`);
        return response;
      } catch (error) {
        throw error;
      }
    },
    find: async (uuid) => {
      try {
        const response = await this.api.get(`/dwellings/${uuid}`);
        return {
          ...response,
          data: new Dwelling(response.data),
        };
      } catch (error) {
        throw error;
      }
    },
    findByCoordinatesUuid: async (coordinates_uuid) => {
      try {
        const response = await this.api.get(
          `/dwellings?coordinates_uuid=${coordinates_uuid}`
        );

        return {
          ...response,
          data: response.data.map((item) => new Dwelling(item))[0] || null,
        };
      } catch (error) {
        throw error;
      }
    },
    changeInhabited: async (uuid) => {
      try {
        const response = await this.api.post(
          `/dwellings/${uuid}/inhabited?_method=PATCH`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    getLastContribution: async (uuid) => {
      try {
        const response = await this.api.get(
          `/dwellings/${uuid}/last-contribution`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    getContributions: async (uuid) => {
      try {
        const response = await this.api.get(`/dwellings/${uuid}/contributions`);
        return {
          ...response,
          data: response.data.map((item) => new Contribution(item)),
        };
      } catch (error) {
        throw error;
      }
    },
    getPendingPeriods: async (uuid) => {
      try {
        const response = await this.api.get(
          `/dwellings/${uuid}/pending-periods`
        );
        return {
          ...response,
          data: response.data.map((item) => new Period(item)),
        };
      } catch (error) {
        throw error;
      }
    },
    getNeighbors: async (uuid) => {
      try {
        const response = await this.api.get(`/dwellings/${uuid}/neighbors`);
        return {
          ...response,
          data: response.data.map((item) => new Neighbor(item)),
        };
      } catch (error) {
        throw error;
      }
    },
    createNeighbor: async (uuid, data) => {
      try {
        const response = await this.api.post(
          `/dwellings/${uuid}/neighbors`,
          data
        );
        return {
          ...response,
          data: new Neighbor(response.data),
        };
      } catch (error) {
        throw error;
      }
    },
    createPeriod: async (uuid, data) => {
      try {
        const response = await this.api.post(`/dwellings/${uuid}/period`, data);
        return {
          ...response,
          data: new Period(response.data),
        };
      } catch (error) {
        throw error;
      }
    },
  };

  neighbor = {
    find: async (uuid) => {
      try {
        const response = await this.api.get(`/neighbors/${uuid}`);
        return {
          ...response,
          data: new Neighbor(response.data),
        };
      } catch (error) {
        throw error;
      }
    },
    delete: async (uuid) => {
      try {
        const response = await this.api.post(
          `/neighbors/${uuid}?_method=DELETE`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    update: async (uuid, data) => {
      try {
        const response = await this.api.post(
          `/neighbors/${uuid}?_method=PUT`,
          data
        );
        return {
          ...response,
          data: new Neighbor(response.data),
        };
      } catch (error) {
        throw error;
      }
    },
  };

  contribution = {
    get: async () => {
      try {
        const response = await this.api.get("/contributions");
        return {
          ...response,
          data: response.data.map((item) => new Contribution(item)),
        };
      } catch (error) {
        throw error;
      }
    },
    getNeighborName: async (contribution_uuid) => {
      try {
        const response = await this.api.get(
          `/contributions/${contribution_uuid}/neighbor-name`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    find: async (uuid) => {
      try {
        const response = await this.api.get(`/contributions/${uuid}/?admin=1`);
        return {
          ...response,
          data: new Contribution(response.data),
        };
      } catch (error) {
        throw error;
      }
    }
  };

  period = {
    find: async (uuid) => {
      try {
        const response = await this.api.get(`/periods/${uuid}`);
        return {
          ...response,
          data: new Period(response.data),
        };
      } catch (error) {
        throw error;
      }
    },
    delete: async (uuid) => {
      try {
        const response = await this.api.post(`/periods/${uuid}?_method=DELETE`);
        return response;
      } catch (error) {
        throw error;
      }
    },
  };

  map = {
    contribuions: async () => {
      try {
        const response = await this.api.get("/map/contributions");
        return {
          ...response,
          data: response.data.map((item) => new MapItem(item)),
        };
      } catch (error) {
        throw error;
      }
    },
  };
}

const apiService = new Api();
export default apiService;
