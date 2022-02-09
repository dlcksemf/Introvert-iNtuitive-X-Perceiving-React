import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/Authcontext';
import useFieldValues from 'base/hooks/useFieldValues';
import { useContext } from 'react';
import { RenderContext } from './AdminApplicationList';

function AdminApplication({ application }) {
  const [auth] = useAuth();
  const { fieldValues, handleFieldChange } = useFieldValues(application);
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

      <div className="mx-4 inline-block">{application.state}</div>

      <div className="w-20 flex flex-col mb-3">
        <select
          className="block w-full bg-grey-lighter text-xs text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          name="state"
          value={fieldValues}
          onChange={handleFieldChange}
        >
          <option value="" className="hidden">
            선택 해주세요
          </option>
          <option value="P">처리 중..</option>
          <option value="O">주문 완료!</option>
          <option value="D">반려</option>
        </select>

        <button className="inline-block" onClick={handleSubmit}>
          저장하기
        </button>
      </div>
    </div>
  );
}

export default AdminApplication;
