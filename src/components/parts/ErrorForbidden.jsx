import photo from './image/403.PNG';

function ErrorForbidden() {
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <img className="w-1/2 h-1/3" src={photo} alter="403 forbidden" />
        </div>
      </div>
    </div>
  );
}

export default ErrorForbidden;
