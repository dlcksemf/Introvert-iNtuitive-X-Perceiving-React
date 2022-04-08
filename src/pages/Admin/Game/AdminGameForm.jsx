import { useApiAxios } from 'base/api/base';
import useFieldValues from 'base/hooks/useFieldValues';
import LoadingIndicator from 'components/LoadingIndicator';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const INIT_FIELD_VALUES = {
  game_name: '',
  player_num: '',
  play_time: '',
  level: '',
  game_rule: '',
  game_state: 'A',
};

function AdminGameForm({ gameId, handleDidSaveGame }) {
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();

  const encodeFileToBase64 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  const [{ data: game }, refetch] = useApiAxios(
    {
      url: `game/api/game/${gameId}/`,
      method: 'GET',
    },
    { manual: !gameId },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !gameId ? '/game/api/game/' : `/game/api/game/${gameId}/`,
      method: !gameId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    game || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.game_cover_photo = '';
      }),
    );
  }, [game, setFieldValues]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('게임의 정보를 업로드 하시겠습니까?')) {
      e.preventDefault();

      const formData = new FormData();
      Object.entries(fieldValues).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          const fileList = value;
          fileList.forEach((file) => formData.append(name, file));
        } else {
          formData.append(name, value);
        }
      });

      saveRequest({
        data: formData,
      }).then((response) => {
        const savedGame = response.data;
        if (handleDidSaveGame) handleDidSaveGame(savedGame);
      });
    } else {
      // navigate(-1);
    }
  };

  const handleCancleButton = (e) => {
    if (window.confirm('게임 등록을 취소하시겠습니까?')) {
      navigate('/admin/gamelist/');
    }
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중..</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다 (${saveError.response?.status} ${saveError.response?.statusText})`}
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="my-20">
          <div className="max-w-3xl mx-auto px-20 py-10 shadow-xl">
            <div className="py-5">
              <label className="font-bold mb-7 text-2xl text-gray-700 block text-center">
                보드게임 등록
              </label>

              <div>
                <div
                  className="mb-3"
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <input
                    name="game_cover_photo"
                    style={{ display: 'none' }}
                    id="img"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      encodeFileToBase64(e, e.target.files[0]);
                    }}
                  />
                  <div className="font-semibold text-indigo-600 hover:text-indigo-700">
                    <label for="img" className="cursor-pointer">
                      🎮 게임 사진 등록하기
                    </label>
                  </div>
                </div>

                {(imageSrc || game?.game_cover_photo) && (
                  <div className="preview">
                    <img
                      src={imageSrc || game?.game_cover_photo}
                      alt="preview-img"
                    />
                  </div>
                )}
              </div>

              {saveErrorMessages.photo?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>

            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                게임명
              </label>
              <input
                name="game_name"
                value={fieldValues.game_name}
                // 여기 result 없애주세요
                onChange={handleFieldChange}
                type="text"
                autoComplete="off"
                placeholder="게임명을 작성해주세요."
                className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {saveErrorMessages.game_name?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                플레이어 수
              </label>
              <input
                name="player_num"
                value={fieldValues.player_num}
                onChange={handleFieldChange}
                type="text"
                autoComplete="off"
                placeholder="플레이어 수를 작성해주세요. ex) 2~4명"
                className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {saveErrorMessages.player_num?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                플레이 시간
              </label>
              <input
                name="play_time"
                value={fieldValues.play_time}
                onChange={handleFieldChange}
                type="text"
                autoComplete="off"
                placeholder="대략적인 플레이 시간을 작성해주세요(1회 기준) ex) 30분"
                className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {saveErrorMessages.play_time?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                게임 난이도
              </label>
              <input
                name="level"
                value={fieldValues.level}
                onChange={handleFieldChange}
                type="text"
                autoComplete="off"
                placeholder="게임 난이도를 작성해주세요. ex) 만 8세 이상"
                className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {saveErrorMessages.level?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>
            <div className="mb-5">
              <label className="font-bold mb-1 text-gray-700 block">
                게임 방법
              </label>
              <textarea
                name="game_rule"
                value={fieldValues.game_rule}
                onChange={handleFieldChange}
                type="date"
                autoComplete="off"
                placeholder="게임 방법을 작성해주세요."
                className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {saveErrorMessages.game_rule?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>

            <div className="my-3 text-center">
              <Button onClick={handleSubmit}>저장하기</Button>
              <button
                className="border border-gray-400 text-gray-500 font-bold py-2 px-4 mr-3 rounded hover:text-gray-700"
                onClick={handleCancleButton}
              >
                <p className="">취소하기</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminGameForm;
