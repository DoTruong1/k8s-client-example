const k8s = require('@kubernetes/client-node');

// Create an instance of the Kubernetes configuration
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// Create an instance of the Kubernetes API client
const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

// Define the PV manifest

// Các giá trị được tham chiếu từ file gốc
const pvManifest = {
  apiVersion: 'v1',
  kind: 'PersistentVolume',
  metadata: {
    annotations: {
      'pv.kubernetes.io/provisioned-by': 'rook-ceph.cephfs.csi.ceph.com',
      'volume.kubernetes.io/provisioner-deletion-secret-name': 'rook-csi-cephfs-provisioner',
      'volume.kubernetes.io/provisioner-deletion-secret-namespace': 'rook-ceph',
    },
    name: 'pvc-05097e8f-68a4-45fb-be78-40b9aea164f0-shared-projectid', // Change the name as needed
  },
  spec: {
    accessModes: ['ReadWriteMany'],
    capacity: {
      storage: '100Gi',
    },
    csi: {
      controllerExpandSecretRef: {
        name: 'rook-csi-cephfs-provisioner',
        namespace: 'rook-ceph',
      },
      driver: 'rook-ceph.cephfs.csi.ceph.com',
      nodeStageSecretRef: {
        name: 'rook-csi-cephfs-node-user',
        namespace: 'rook-ceph',
      },
      volumeAttributes: {
        clusterID: 'rook-ceph',
        fsName: 'myfs',
        pool: 'myfs-replicated',
        'storage.kubernetes.io/csiProvisionerIdentity': '1713191888757-6006-rook-ceph.cephfs.csi.ceph.com',
        subvolumeName: 'csi-vol-72788a2a-b74e-4903-a6a9-33b567a4d8c0',
        subvolumePath: '/volumes/csi/csi-vol-72788a2a-b74e-4903-a6a9-33b567a4d8c0/34fc493b-017c-4a08-b0ee-2182c50d2779',
        rootPath: '/volumes/csi/csi-vol-72788a2a-b74e-4903-a6a9-33b567a4d8c0/34fc493b-017c-4a08-b0ee-2182c50d2779',
        staticVolume: 'true',
      },
      volumeHandle: '0001-0009-rook-ceph-0000000000000001-72788a2a-b74e-4903-a6a9-33b567a4d8c0-shared-pvc',
    },
    persistentVolumeReclaimPolicy: 'Retain', // Change to 'Delete' if needed
    storageClassName: 'rook-cephfs',
    volumeMode: 'Filesystem',
  },
};

// Call the API to create the persistent volume
k8sApi.createPersistentVolume(pvManifest)
  .then((response) => {
    console.log('Persistent Volume created:', response.body);
  })
  .catch((err) => {
    console.error('Error:', err);
  });