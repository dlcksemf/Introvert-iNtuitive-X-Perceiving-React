import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import React, { useEffect } from 'react';

function Category() {
  const [auth] = useAuth();
  const [{ data: categoryList, loading, error }, refetch] = useApiAxios(
    {
      url: `/books/api/category/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <React.Fragment>
      <option>카테고리 리스트</option>
      {categoryList?.map((category) => (
        <option>{category.name}</option>
      ))}
    </React.Fragment>
  );
}

export default Category;
