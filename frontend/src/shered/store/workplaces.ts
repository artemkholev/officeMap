import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import type { Iworkplace, Iworkplaces } from '../api/workplacesApi/workplaceApi.types';
import { useRoute } from 'vue-router';
import { apiAxios } from '../api';

export const useWorkplacesStore = defineStore('workplaces', () => {
  const isError = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  let workplases = ref<Iworkplaces[]>([]);
  const workplace = ref<Iworkplace>();

  const selected = ref<string>('');
  const page = ref(1);
  const limit = ref(10);
  const totalPages = ref(0);
  const selectOptions = reactive([
    {
      name: 'Обычный порядок',
      value:  'general'
    },
    {
      name: 'По названию',
      value:  'title'
    },
  ]);

  const route = useRoute();

  const sortedPlans = computed(() => {
    return [...workplases.value].sort((workplace1: any, workplace2: any) => workplace1[selected.value]?.localeCompare(workplace2[selected.value]))
  });

  // const removePlan = (workplace: any) => {
  //   workplases.value = workplases.value.filter(p => p.id !== workplace.id)
  // }

  const getWorkplaces = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get('/workplaces', {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      workplases.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }


  const getWorkplace = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get('/workplace/' + route.params.id);
      workplace.value = responce.data;
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {}
});