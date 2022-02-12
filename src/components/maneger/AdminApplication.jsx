import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useContext, useEffect, useState } from 'react';
import { RenderContext } from './AdminApplicationList';
import Badge from 'designMaterials/Badge';

function AdminApplication({ application }) {
  const [auth] = useAuth();
  const { fieldValues, handleFieldChange } = useFieldValues(application);
  const [color, setColor] = useState(() => {
    if (application.state === 'P') {
      return 'yellow';
    } else if (application.state === 'D') {
      return 'red';
    } else {
      return 'green';
    }
  });

  useEffect(() => {
    if (application.state === 'P') {
      setColor('yellow');
    } else if (application.state === 'D') {
      setColor('red');
    } else {
      setColor('green');
    }
  }, [application]);

  const { setReload } = useContext(RenderContext);

  const [{ loading, error }, saveApplication] = useApiAxios(
    {
      url: `/books/api/applications/${application.application_num}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    saveApplication({
      data: { ...fieldValues },
    })
      .then(() => {
        setReload((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex">
      <div className="inline-block">{application.title}</div>
      <div className="mx-4 inline-block">{application.writer}</div>
      <div className="mx-4 inline-block">{application.publisher}</div>
      <div className="mx-4 inline-block">{application.ISBN}</div>

      <Badge color={color}>{application.state}</Badge>

      <div className="w-72 flex mb-3">
        <select
          className="block bg-grey-lighter text-xs text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          name="state"
          value={fieldValues.state}
          onChange={handleFieldChange}
        >
          <option value="" className="hidden">
            선택 해주세요
          </option>
          <option value="P">처리 중..</option>
          <option value="O">주문 완료!</option>
          <option value="D">반려</option>
        </select>

        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  );
}

export default AdminApplication;
