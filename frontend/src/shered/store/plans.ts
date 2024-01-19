import type { IPlan } from '../api/plansApi/planApi.types';
import { apiAxios } from '../api';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { IAuthor } from '../api/plansApi/authorApi.types';

export const usePlansStore = defineStore('plans', () => {
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  let plans = ref<IPlan[]>([]);
  const plan = ref<IPlan>();
  const author = ref<IAuthor>();

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
    {
      name: 'По содержанию',
      value: 'body'
    }
  ]);

  const route = useRoute();

  const sortedPlans = computed(() => {
    return [...plans.value].sort((plan1: any, plan2: any) => plan1[selected.value]?.localeCompare(plan2[selected.value]))
  });

  const removePlan = (post: any) => {
    plans.value = plans.value.filter(p => p.id !== post.id)
  }

  const getPlans = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get('/plans', {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      plans.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };


  const getPlan = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios('/plans/' + route.params.id);
      plan.value = responce.data;
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const getInfoAboutAuthor = async (id: number | undefined) => {
    isLoading.value = true;
    try {
      const responce = await apiAxios('/users/' + id);
      author.value = responce.data;
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  return { getInfoAboutAuthor, getPlans, getPlan, removePlan, isError, isLoading, plans, plan, page, limit, selected, totalPages, selectOptions, sortedPlans, author };
});