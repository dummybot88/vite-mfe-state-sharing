import { Modal } from '@els/els-react--modal'
import useUnauthorisedStore, { toggleUnauthorizedModalVisibility } from '../../store/unauthorised/unauthorisedStore'

const Unauthorised = () => {
  const { toggleUnauthorisedModal } = useUnauthorisedStore()
  return (
    toggleUnauthorisedModal && (
      <Modal onClose={() => toggleUnauthorizedModalVisibility(false)}>
        <div className="u-els-view-width-1o2">
          <h2>
            <b>Uh-oh! You are not authenticated!</b>
          </h2>
          <h4>Please log in to Journals Production Hub.</h4>
        </div>
      </Modal>
    )
  )
}

export default Unauthorised
