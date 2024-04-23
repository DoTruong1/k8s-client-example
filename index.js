const k8s = require('@kubernetes/client-node');

// Create an instance of the Kubernetes configuration
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// Create an instance of the Kubernetes API client
const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

// Specify the name of the persistent volume you want to retrieve
// tên của pv, là giá trị của pv_name lấy lại được từ bước trước
const pvName = 'pvc-05097e8f-68a4-45fb-be78-40b9aea164f0';

// Call the API to get the persistent volume
k8sApi.readPersistentVolume(pvName)
  .then((response) => {
    const pv = response.body;
    console.log('Persistent Volume:', pv);
  })
  .catch((err) => {
    console.error('Error:', err);
  });

//   apiVersion: 'v1',
//   kind: 'PersistentVolume',
//   metadata: V1ObjectMeta {
//     annotations: { 'pv.kubernetes.io/provisioned-by': 'rancher.io/local-path' },
//     creationTimestamp: 2024-04-22T04:24:23.000Z,
//     deletionGracePeriodSeconds: undefined,
//     deletionTimestamp: undefined,
//     finalizers: [ 'kubernetes.io/pv-protection' ],
//     generateName: undefined,
//     generation: undefined,
//     labels: undefined,
//     managedFields: [ [V1ManagedFieldsEntry], [V1ManagedFieldsEntry] ],
//     name: 'pvc-1d0e36ea-690c-4967-be75-0ce75454f49e',
//     namespace: undefined,
//     ownerReferences: undefined,
//     resourceVersion: '5052',
//     selfLink: undefined,
//     uid: '230e6741-c524-4ae8-91e2-34a2b133a68d'
//   },
//   spec: V1PersistentVolumeSpec {
//     accessModes: [ 'ReadWriteOnce' ],
//     awsElasticBlockStore: undefined,
//     azureDisk: undefined,
//     azureFile: undefined,
//     capacity: { storage: '68719476736' },
//     cephfs: undefined,
//     cinder: undefined,
//     claimRef: V1ObjectReference {
//       apiVersion: 'v1',
//       fieldPath: undefined,
//       kind: 'PersistentVolumeClaim',
//       name: 'data1-test-pool-0-1',
//       namespace: 'minio-test',
//       resourceVersion: '4677',
//       uid: '1d0e36ea-690c-4967-be75-0ce75454f49e'
//     },
//     csi: undefined,
//     fc: undefined,
//     flexVolume: undefined,
//     flocker: undefined,
//     gcePersistentDisk: undefined,
//     glusterfs: undefined,
//     hostPath: V1HostPathVolumeSource {
//       path: '/var/lib/rancher/k3s/storage/pvc-1d0e36ea-690c-4967-be75-0ce75454f49e_minio-test_data1-test-pool-0-1',
//       type: 'DirectoryOrCreate'
//     },
//     iscsi: undefined,
//     local: undefined,
//     mountOptions: undefined,
//     nfs: undefined,
//     nodeAffinity: V1VolumeNodeAffinity { required: [V1NodeSelector] },
//     persistentVolumeReclaimPolicy: 'Delete',
//     photonPersistentDisk: undefined,
//     portworxVolume: undefined,
//     quobyte: undefined,
//     rbd: undefined,
//     scaleIO: undefined,
//     storageClassName: 'local-path',
//     storageos: undefined,
//     volumeMode: 'Filesystem',
//     vsphereVolume: undefined
//   },
//   status: V1PersistentVolumeStatus {
//     lastPhaseTransitionTime: undefined,
//     message: undefined,
//     phase: 'Bound',
//     reason: undefined
//   }